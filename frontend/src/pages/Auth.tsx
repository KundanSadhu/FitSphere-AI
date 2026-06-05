import { useState, FormEvent } from 'react';
import { Bot, Mail, Lock, User as UserIcon } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthPageProps {
  onSuccess: () => void;
}

export function AuthPage({ onSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      onSuccess();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is disabled. Please go to your Firebase Console > Authentication > Sign-in method and enable Google provider.');
      } else {
        setError(err.message || 'Failed to authenticate with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (err: any) {
      console.error(err);
      let errorMsg = 'Authentication failed';
      if (err.code === 'auth/invalid-credential') errorMsg = 'Invalid email or password.';
      else if (err.code === 'auth/user-not-found') errorMsg = 'No user found with this email.';
      else if (err.code === 'auth/wrong-password') errorMsg = 'Incorrect password.';
      else if (err.code === 'auth/email-already-in-use') errorMsg = 'Email is already registered.';
      else if (err.code === 'auth/weak-password') errorMsg = 'Password is too weak. Please use at least 6 characters.';
      else if (err.code === 'auth/operation-not-allowed') errorMsg = 'Authentication provider is disabled. Please go to your Firebase Console > Authentication > Sign-in method and enable Email/Password and Google providers.';
      else if (err.message) errorMsg = err.message;
      
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border-2 border-[#191A23] rounded-[24px] shadow-[6px_6px_0px_#191A23] p-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#B9FF66] border-2 border-[#191A23] shadow-[4px_4px_0px_#191A23] flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-[#191A23] stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-[#191A23] uppercase tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">
            {isLogin ? 'Sign in to access your dashboard' : 'Join FitSphere AI Ecosystem'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border-2 border-[#191A23] rounded-xl text-rose-600 text-xs font-black shadow-[3px_3px_0px_#191A23]">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-black text-[#191A23] uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#191A23] rounded-xl text-sm font-semibold text-[#191A23] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] focus:border-[#191A23] transition-all"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-black text-[#191A23] uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#191A23] rounded-xl text-sm font-semibold text-[#191A23] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] focus:border-[#191A23] transition-all"
                placeholder="athlete@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-[#191A23] uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#191A23] rounded-xl text-sm font-semibold text-[#191A23] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] focus:border-[#191A23] transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#191A23] text-white py-3 rounded-xl font-black text-sm uppercase tracking-wider border-2 border-[#191A23] hover:bg-[#2A2B36] transition-all shadow-[4px_4px_0px_#B9FF66] active:translate-y-1 active:translate-x-1 active:shadow-[1px_1px_0px_#B9FF66] disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? (
               <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-slate-400 font-extrabold uppercase">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full bg-white text-[#191A23] py-3 rounded-xl font-black text-sm uppercase tracking-wider border-2 border-[#191A23] hover:bg-[#F3F3F3] transition-all shadow-[4px_4px_0px_#191A23] active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-3 disabled:opacity-70 mb-8"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>

        <p className="text-center text-xs font-black text-slate-500 uppercase">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none transition-colors"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
