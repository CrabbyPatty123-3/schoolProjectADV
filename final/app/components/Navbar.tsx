'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    signOut();
    setShowDropdown(false);
    router.push('/');
  };

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

        {/* Right side - FAQ and User */}
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
          
          {isAuthenticated && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-md px-4 py-2 transition-colors"
                style={{ 
                  color: '#003049',
                  backgroundColor: showDropdown ? '#f0f0f0' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!showDropdown) e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  if (!showDropdown) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span className="font-medium">{user.name}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg border"
                  style={{ borderColor: '#e5e5e5' }}>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50"
                    style={{ color: '#c1121f' }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

