const API_BASE = '';

function getToken(): string | null {
  return localStorage.getItem('fitsphere_token');
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(options.headers as Record<string, string> || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('fitsphere_token');
    localStorage.removeItem('fitsphere_auth');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export const api = {
  auth: {
    async register(email: string, password: string, name: string) {
      const data = await request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
      localStorage.setItem('fitsphere_token', data.token);
      localStorage.setItem('fitsphere_auth', 'true');
      return data.user;
    },

    async login(email: string, password: string) {
      const data = await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('fitsphere_token', data.token);
      localStorage.setItem('fitsphere_auth', 'true');
      return data.user;
    },

    async me() {
      try {
        const data = await request('/api/auth/me');
        return data.user;
      } catch {
        return null;
      }
    },

    async google(credentialOrEmail: string, userInfo?: any) {
      const body: any = {};
      if (userInfo && typeof userInfo === 'object' && userInfo.email) {
        body.email = userInfo.email;
        body.name = userInfo.name || userInfo.given_name;
        body.photoUrl = userInfo.picture;
        body.googleId = userInfo.sub;
      } else {
        body.credential = credentialOrEmail;
      }
      const data = await request('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      localStorage.setItem('fitsphere_token', data.token);
      localStorage.setItem('fitsphere_auth', 'true');
      return data.user;
    },

    logout() {
      localStorage.removeItem('fitsphere_token');
      localStorage.removeItem('fitsphere_auth');
    },
  },

  data: {
    async get<T>(key: string): Promise<T | null> {
      const data = await request(`/api/data/${key}`);
      return data.data as T | null;
    },

    async set(key: string, value: any) {
      await request(`/api/data/${key}`, {
        method: 'PUT',
        body: JSON.stringify({ data: value }),
      });
    },

    async getAll(): Promise<Record<string, any>> {
      return request('/api/data');
    },
  },

  user: {
    async updateProfile(profile: { name?: string; photo_url?: string; role?: string }) {
      const data = await request('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
      return data.user;
    },

    async updateStats(stats: { streak?: number; level?: number; points?: number; xp?: number; target_xp?: number; onboarding_completed?: boolean }) {
      const data = await request('/api/user/stats', {
        method: 'PUT',
        body: JSON.stringify(stats),
      });
      return data.user;
    },
  },
};
