'use client';

import { useAuth } from '../context/AuthContext';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const { signIn } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle sign in with backend
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    // Mock user - will be replaced with actual API call
    // For now, simulate successful sign in
    signIn({
      id: '1',
      name: email.split('@')[0] || 'User',
      email: email,
    });
    
    onClose(); // Close modal after successful sign in
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: '#fdf0d5' }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold" style={{ color: '#003049' }}>
            Sign In
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-semibold leading-none transition-colors hover:opacity-70"
            style={{ color: '#003049' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Email or Username
            </label>
            <input
              type="text"
              name="email"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
              placeholder="Enter your email or username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded"
                style={{ accentColor: '#003049' }}
              />
              <span className="text-sm" style={{ color: '#666' }}>
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm transition-colors hover:underline"
              style={{ color: '#c1121f' }}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-md px-4 py-3 font-semibold text-white transition-colors"
            style={{ backgroundColor: '#003049' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002439'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003049'}
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: '#666' }}>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="font-semibold transition-colors hover:underline"
              style={{ color: '#c1121f' }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

