'use client';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function SuccessModal({ isOpen, onClose, message = 'ID Generated' }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: '#fdf0d5' }}
      >
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: '#003049' }}
            >
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold" style={{ color: '#003049' }}>
            {message}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md px-8 py-3 font-semibold text-white transition-colors"
            style={{ backgroundColor: '#003049' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002439'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003049'}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

