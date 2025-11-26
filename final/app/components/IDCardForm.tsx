'use client';

import { useState, useRef, ChangeEvent } from 'react';
import CardPreview from './CardPreview';

const HEADER_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#c1121f' },
  { name: 'Darker Blue', value: '#003049' },
  { name: 'Brown', value: '#8b4513' },
  { name: 'Maroon', value: '#800000' },
];

export default function IDCardForm() {
  const [cardTitle, setCardTitle] = useState('HOLY CROSS OF DAVAO COLLEGE');
  const [headerColor, setHeaderColor] = useState('#003049');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [includeQRCode, setIncludeQRCode] = useState(true);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleReset = () => {
    setCardTitle('HOLY CROSS OF DAVAO COLLEGE');
    setHeaderColor('#003049');
    setStudentName('');
    setStudentId('');
    setCourse('');
    setYearLevel('');
    setBirthdate('');
    setPhotoUrl(null);
    setAdditionalInfo('');
    setIncludeQRCode(true);
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold" style={{ color: '#003049' }}>School ID Maker</h1>
        <p className="mt-2" style={{ color: '#003049' }}>Create your own School ID hassle free.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Panel - Form */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold" style={{ color: '#003049' }}>Card Details</h2>
          
          <div className="space-y-6">
            {/* Card Title */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                School Name
              </label>
              <input
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
                style={{ borderColor: '#003049', color: '#333' }}
              />
            </div>

            {/* Header Color */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                Header Color
              </label>
              <div className="flex gap-3">
                {HEADER_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setHeaderColor(color.value)}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      headerColor === color.value
                        ? 'scale-110'
                        : 'hover:opacity-80'
                    }`}
                    style={{ 
                      backgroundColor: color.value,
                      borderColor: headerColor === color.value ? '#003049' : '#d1d5db'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Student Name */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                Student Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
                style={{ borderColor: '#003049', color: '#333' }}
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                ID Number
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter ID number"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
                style={{ borderColor: '#003049', color: '#333' }}
              />
            </div>

            {/* Course */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                Course
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Enter course"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
                style={{ borderColor: '#003049', color: '#333' }}
              />
            </div>

            {/* Year Level */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                Year Level
              </label>
              <input
                type="text"
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
                placeholder="Enter year level"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
                style={{ borderColor: '#003049', color: '#333' }}
              />
            </div>

            {/* Birthdate */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                Birthdate
              </label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
                style={{ borderColor: '#003049', color: '#333' }}
              />
            </div>

            {/* Upload Photo */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                Upload Photo
              </label>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: '#003049', color: '#333' }}
              />
            </div>

            {/* Additional Information */}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
                Additional Information
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={3}
                placeholder="Any additional information"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
                style={{ borderColor: '#003049', color: '#333' }}
              />
            </div>

            {/* Include QR Code */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="qrCode"
                checked={includeQRCode}
                onChange={(e) => setIncludeQRCode(e.target.checked)}
                className="h-4 w-4 rounded"
                style={{ 
                  accentColor: '#003049'
                }}
              />
              <label htmlFor="qrCode" className="text-sm font-medium" style={{ color: '#003049' }}>
                Include QR Code
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {}}
                className="flex-1 rounded-md px-4 py-3 font-medium text-white transition-colors"
                style={{ backgroundColor: '#003049' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002439'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003049'}
              >
                Generate Card
              </button>
              <button
                onClick={handleReset}
                className="rounded-md border px-6 py-3 font-medium transition-colors"
                style={{ 
                  borderColor: '#003049',
                  color: '#003049',
                  backgroundColor: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div>
          <CardPreview
            cardTitle={cardTitle}
            headerColor={headerColor}
            studentName={studentName}
            studentId={studentId}
            course={course}
            yearLevel={yearLevel}
            birthdate={birthdate}
            photoUrl={photoUrl}
            additionalInfo={additionalInfo}
            includeQRCode={includeQRCode}
          />
        </div>
      </div>
    </div>
  );
}

