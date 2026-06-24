import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { JWT_SECRET } from './auth.js';

const router = Router();

function getUserId(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;
  try {
    const decoded = jwt.verify(authHeader.slice(7), JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch { return null; }
}

router.get('/data/:key', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await query(
      'SELECT value FROM user_data WHERE user_id = $1 AND key = $2',
      [userId, req.params.key]
    );
    res.json({ data: result.rows[0]?.value || null });
  } catch (err) {
    console.error('Get data error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.put('/data/:key', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    await query(
      `INSERT INTO user_data (user_id, key, value) VALUES ($1, $2, $3::jsonb)
       ON CONFLICT (user_id, key) DO UPDATE SET value = $3::jsonb, updated_at = NOW()`,
      [userId, req.params.key, JSON.stringify(req.body.data)]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Put data error:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

router.get('/data', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await query(
      'SELECT key, value FROM user_data WHERE user_id = $1',
      [userId]
    );
    const allData: Record<string, any> = {};
    for (const row of result.rows) {
      allData[row.key] = row.value;
    }
    res.json(allData);
  } catch (err) {
    console.error('Get all data error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.put('/user/profile', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { name, photo_url, role } = req.body;
  try {
    const result = await query(
      `UPDATE users SET name = COALESCE($1, name), photo_url = COALESCE($2, photo_url),
       role = COALESCE($3, role), updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, role, photo_url, streak, level, points, xp, target_xp, onboarding_completed`,
      [name, photo_url, role, userId]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.put('/user/stats', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { streak, level, points, xp, target_xp, onboarding_completed } = req.body;
  try {
    const result = await query(
      `UPDATE users SET
       streak = COALESCE($1, streak), level = COALESCE($2, level),
       points = COALESCE($3, points), xp = COALESCE($4, xp),
       target_xp = COALESCE($5, target_xp),
       onboarding_completed = COALESCE($6, onboarding_completed),
       updated_at = NOW()
       WHERE id = $7
       RETURNING id, name, email, role, photo_url, streak, level, points, xp, target_xp, onboarding_completed`,
      [streak, level, points, xp, target_xp, onboarding_completed, userId]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Update stats error:', err);
    res.status(500).json({ error: 'Failed to update stats' });
  }
});

export { router as dataRouter };
