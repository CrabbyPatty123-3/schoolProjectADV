'use client';

import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';

interface CardPreviewProps {
  cardTitle: string;
  headerColor: string;
  studentName: string;
  studentId: string;
  course: string;
  yearLevel: string;
  birthdate: string;
  photoUrl: string | null;
  additionalInfo: string;
  includeQRCode: boolean;
}

export default function CardPreview({
  cardTitle,
  headerColor,
  studentName,
  studentId,
  course,
  yearLevel,
  birthdate,
  photoUrl,
  additionalInfo,
  includeQRCode,
}: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadAsPNG = async () => {
    if (!cardRef.current) return;

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        logging: false,
      } as any);

      const link = document.createElement('a');
      link.download = `school-id-card-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-white p-4 shadow-md">
        <h3 className="mb-4 text-lg font-semibold" style={{ color: '#003049' }}>Card Preview</h3>
        <div
          ref={cardRef}
          className="mx-auto w-[350px] overflow-hidden rounded-lg bg-white shadow-lg"
          style={{ aspectRatio: '2/3' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-center py-3 px-4"
            style={{ backgroundColor: headerColor }}
          >
            <h2 className="text-sm font-bold text-white uppercase text-center leading-tight">
              {cardTitle}
            </h2>
          </div>

          {/* Card Body */}
          <div className="p-5">
            {/* Photo Section */}
            <div className="mb-4 flex justify-center">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Student"
                  className="h-28 w-28 rounded-full object-cover border-3"
                  style={{ borderColor: '#003049', borderWidth: '3px' }}
                />
              ) : (
                <div 
                  className="flex h-28 w-28 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#f0f0f0', border: '3px solid #003049' }}
                >
                  <svg
                    className="h-14 w-14"
                    style={{ color: '#999' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Student Name - Prominent */}
            <div className="mb-4 text-center">
              <h3 
                className="text-2xl font-bold mb-1"
                style={{ color: '#003049' }}
              >
                {studentName || 'Student Name'}
              </h3>
            </div>

            {/* Student Details Section */}
            <div className="mb-4 space-y-2.5">
              {studentId && (
                <div className="flex items-start border-b pb-1.5" style={{ borderColor: '#e5e5e5' }}>
                  <span className="text-xs font-semibold w-24" style={{ color: '#666' }}>
                    STUDENT ID:
                  </span>
                  <span className="text-sm flex-1 font-medium" style={{ color: '#003049' }}>
                    {studentId}
                  </span>
                </div>
              )}
              
              {course && (
                <div className="flex items-start border-b pb-1.5" style={{ borderColor: '#e5e5e5' }}>
                  <span className="text-xs font-semibold w-24" style={{ color: '#666' }}>
                    COURSE:
                  </span>
                  <span className="text-sm flex-1 font-medium" style={{ color: '#003049' }}>
                    {course}
                  </span>
                </div>
              )}
              
              {yearLevel && (
                <div className="flex items-start border-b pb-1.5" style={{ borderColor: '#e5e5e5' }}>
                  <span className="text-xs font-semibold w-24" style={{ color: '#666' }}>
                    YEAR LEVEL:
                  </span>
                  <span className="text-sm flex-1 font-medium" style={{ color: '#003049' }}>
                    {yearLevel}
                  </span>
                </div>
              )}
              
              {birthdate && (
                <div className="flex items-start border-b pb-1.5" style={{ borderColor: '#e5e5e5' }}>
                  <span className="text-xs font-semibold w-24" style={{ color: '#666' }}>
                    BIRTHDATE:
                  </span>
                  <span className="text-sm flex-1 font-medium" style={{ color: '#003049' }}>
                    {new Date(birthdate).toLocaleDateString('en-GB', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Additional Info */}
            {additionalInfo && (
              <div className="mb-4 border-t pt-3" style={{ borderColor: '#e5e5e5' }}>
                <p className="text-xs leading-relaxed" style={{ color: '#666' }}>
                  {additionalInfo}
                </p>
              </div>
            )}

            {/* Bottom Section - Signature and QR Code */}
            <div className="mt-4 flex items-end justify-between border-t pt-3" style={{ borderColor: '#e5e5e5' }}>
              <div className="flex-1">
                <div className="mb-1 border-b" style={{ borderColor: '#999', width: '80px' }}></div>
                <p className="text-xs font-semibold" style={{ color: '#666' }}>
                  Authorized Sign
                </p>
              </div>
              {includeQRCode && (
                <div 
                  className="flex h-14 w-14 items-center justify-center rounded"
                  style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
                >
                  <svg
                    className="h-10 w-10"
                    style={{ color: '#666' }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm0 4h3v2h-3v-2zm-4-4h3v2h-3v-2zm0 4h3v2h-3v-2zm-4-4h3v2h-3v-2zm0 4h3v2h-3v-2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-3 text-center">
              <p className="text-xs font-medium" style={{ color: '#999' }}>
                student
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

