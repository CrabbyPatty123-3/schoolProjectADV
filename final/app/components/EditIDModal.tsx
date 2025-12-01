'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';

interface EditIDModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: {
    id: number;
    card_title: string;
    header_color: string;
    student_name: string;
    student_id: string;
    course: string;
    year_level: string;
    birthdate: string;
    photo_url: string;
    additional_info: string;
    include_qr_code: boolean;
  };
  onSave: (updatedData: any) => void;
}

const HEADER_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#c1121f' },
  { name: 'Darker Blue', value: '#003049' },
  { name: 'Brown', value: '#8b4513' },
  { name: 'Maroon', value: '#800000' },
];

export default function EditIDModal({ isOpen, onClose, cardData, onSave }: EditIDModalProps) {
  const [cardTitle, setCardTitle] = useState(cardData.card_title);
  const [headerColor, setHeaderColor] = useState(cardData.header_color);
  const [studentName, setStudentName] = useState(cardData.student_name);
  const [studentId, setStudentId] = useState(cardData.student_id || '');
  const [course, setCourse] = useState(cardData.course || '');
  const [yearLevel, setYearLevel] = useState(cardData.year_level || '');
  const [birthdate, setBirthdate] = useState(cardData.birthdate || '');
  const [photoUrl, setPhotoUrl] = useState<string | null>(cardData.photo_url);
  const [additionalInfo, setAdditionalInfo] = useState(cardData.additional_info || '');
  const [includeQRCode, setIncludeQRCode] = useState(cardData.include_qr_code);

  const photoInputRef = useRef<HTMLInputElement>(null);

  // Update state when cardData changes
  useEffect(() => {
    if (isOpen && cardData) {
      setCardTitle(cardData.card_title);
      setHeaderColor(cardData.header_color);
      setStudentName(cardData.student_name);
      setStudentId(cardData.student_id || '');
      setCourse(cardData.course || '');
      setYearLevel(cardData.year_level || '');
      setBirthdate(cardData.birthdate || '');
      setPhotoUrl(cardData.photo_url);
      setAdditionalInfo(cardData.additional_info || '');
      setIncludeQRCode(cardData.include_qr_code);
    }
  }, [isOpen, cardData]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: cardData.id,
      card_title: cardTitle,
      header_color: headerColor,
      student_name: studentName,
      student_id: studentId,
      course: course,
      year_level: yearLevel,
      birthdate: birthdate || null,
      photo_url: photoUrl,
      additional_info: additionalInfo,
      include_qr_code: includeQRCode,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: '#fdf0d5' }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold" style={{ color: '#003049' }}>
            Edit ID Card
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-semibold leading-none transition-colors hover:opacity-70"
            style={{ color: '#003049' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Header Color
            </label>
            <div className="flex gap-3">
              {HEADER_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setHeaderColor(color.value)}
                  className={`h-10 w-10 rounded-full border-2 transition-all ${
                    headerColor === color.value
                      ? 'scale-110'
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: color.value,
                    borderColor: headerColor === color.value ? '#003049' : '#d1d5db',
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Student Name
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Course
            </label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Year Level
            </label>
            <input
              type="text"
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: '#003049' }}>
              Additional Information
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={3}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1"
              style={{ borderColor: '#003049', color: '#333' }}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="editQrCode"
              checked={includeQRCode}
              onChange={(e) => setIncludeQRCode(e.target.checked)}
              className="h-4 w-4 rounded"
              style={{ accentColor: '#003049' }}
            />
            <label htmlFor="editQrCode" className="text-sm font-medium" style={{ color: '#003049' }}>
              Include QR Code
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-md px-4 py-3 font-medium text-white transition-colors"
              style={{ backgroundColor: '#003049' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002439'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003049'}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-6 py-3 font-medium transition-colors"
              style={{
                borderColor: '#003049',
                color: '#003049',
                backgroundColor: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

