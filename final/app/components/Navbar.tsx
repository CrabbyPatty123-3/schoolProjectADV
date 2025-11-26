'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#003049]/20 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Left side - Logo and Name */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded" style={{ backgroundColor: '#003049' }}></div>
          <Link href="/" className="text-xl font-bold" style={{ color: '#003049' }}>
            IDify
          </Link>
        </div>

        {/* Right side - FAQ */}
        <div className="flex items-center gap-6">
          <Link
            href="/faq"
            className="transition-colors"
            style={{ color: '#003049' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c1121f'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#003049'}
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
}

