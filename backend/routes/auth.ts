import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { query } from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fitsphere-jwt-secret-change-in-production';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID || '';
const ENABLE_GOOGLE_OAUTH = process.env.ENABLE_GOOGLE_OAUTH === 'true' && !!GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)
       RETURNING id, name, email, role, photo_url, streak, level, points, xp, target_xp, onboarding_completed`,
      [name, email, password_hash]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user });
  } catch (err: any) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await query(
      'SELECT id, name, email, role, photo_url, streak, level, points, xp, target_xp, onboarding_completed, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { password_hash, ...safeUser } = user;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: safeUser });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/google', async (req: Request, res: Response) => {
  try {
    const { credential, email: providedEmail, name: providedName, photoUrl: providedPhoto, googleId: providedGoogleId } = req.body;

    let email = providedEmail;
    let name = providedName;
    let photoUrl = providedPhoto;
    let googleId = providedGoogleId;

    if (credential) {
      let payload: any;
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: [GOOGLE_CLIENT_ID, '1046551484178-htd1kvr12kk3vupv5cvjmt5dnt9nmbqf.apps.googleusercontent.com'],
        });
        payload = ticket.getPayload();
      } catch (verifyErr) {
        const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
        if (!verifyRes.ok) {
          return res.status(401).json({ error: 'Invalid Google credential' });
        }
        payload = await verifyRes.json();
      }

      if (!payload || !payload.email) {
        return res.status(400).json({ error: 'Google account has no email' });
      }
      email = payload.email;
      name = name || payload.name || payload.given_name || email.split('@')[0];
      photoUrl = photoUrl || payload.picture || null;
      googleId = googleId || payload.sub || null;
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required for Google sign-in' });
    }
    if (!name) name = email.split('@')[0];

    const existing = await query(
      'SELECT id, name, email, role, photo_url, streak, level, points, xp, target_xp, onboarding_completed FROM users WHERE email = $1',
      [email]
    );
    let user;
    if (existing.rows.length > 0) {
      user = existing.rows[0];
      if (photoUrl && photoUrl !== user.photo_url) {
        await query('UPDATE users SET photo_url = $1, updated_at = NOW() WHERE id = $2', [photoUrl, user.id]);
        user.photo_url = photoUrl;
      }
    } else {
      const result = await query(
        `INSERT INTO users (name, email, photo_url, password_hash) VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, role, photo_url, streak, level, points, xp, target_xp, onboarding_completed`,
        [name, email, photoUrl, googleId ? `google:${googleId}` : 'google-oauth']
      );
      user = result.rows[0];
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err: any) {
    console.error('Google auth error:', err);
    res.status(500).json({ error: 'Google authentication failed' });
  }
});

router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const result = await query(
      'SELECT id, name, email, role, photo_url, streak, level, points, xp, target_xp, onboarding_completed FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    console.error('Me error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export { router as authRouter };
export { JWT_SECRET };
