'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import IDCardForm from './components/IDCardForm';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

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
            Create your own School ID hassle free
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-md px-8 py-4 text-lg font-semibold text-white transition-colors shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#c1121f' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a00e1a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c1121f'}
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}
