'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import IDCardForm from './components/IDCardForm';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  if (showForm) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#fdf0d5' }}>
        <Navbar />
        <IDCardForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf0d5' }}>
      <Navbar />
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold" style={{ color: '#003049' }}>
            Start creating
          </h1>
          <p className="mb-8 text-lg" style={{ color: '#003049' }}>
            Build your own School ID with ease
          </p>
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={() => setShowForm(true)}
              className="rounded-md px-8 py-4 text-lg font-semibold text-white transition-colors shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#c1121f' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a00e1a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c1121f'}
            >
              Get Started
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSignIn(true)}
                className="rounded-md px-6 py-3 text-base font-semibold transition-colors"
                style={{ 
                  backgroundColor: '#003049',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002439'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003049'}
              >
                Sign In
              </button>
              <button
                onClick={() => setShowSignUp(true)}
                className="rounded-md px-6 py-3 text-base font-semibold text-white transition-colors"
                style={{ backgroundColor: '#c1121f' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a00e1a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c1121f'}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </main>

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    </div>
  );
}
