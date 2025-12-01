'use client';

import { useAuth } from '../context/AuthContext';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
  onSignUpSuccess: () => void;
}

export default function SignUpModal({ isOpen, onClose, onSwitchToSignIn, onSignUpSuccess }: SignUpModalProps) {
  const { signIn } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Auto sign in after successful sign up (with remember me)
        signIn({
          id: data.user.id.toString(),
          name: data.user.name,
          email: data.user.email,
        }, true);
        onClose();
        onSignUpSuccess(); // Redirect to form
      } else {
        alert(data.error || 'Sign up failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert('Failed to create account. Please try again.');
    }
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
            Sign Up
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
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
              placeholder="Enter your email"
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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded"
              style={{ accentColor: '#003049' }}
            />
            <label className="text-sm" style={{ color: '#666' }}>
              I agree to the{' '}
              <a href="#" className="underline" style={{ color: '#c1121f' }}>
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="underline" style={{ color: '#c1121f' }}>
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md px-4 py-3 font-semibold text-white transition-colors"
            style={{ backgroundColor: '#c1121f' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a00e1a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c1121f'}
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: '#666' }}>
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignIn}
              className="font-semibold transition-colors hover:underline"
              style={{ color: '#c1121f' }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

