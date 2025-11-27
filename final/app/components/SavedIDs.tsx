'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SavedID {
  id: number;
  card_title: string;
  header_color: string;
  student_name: string;
  student_id: string;
  course: string;
  year_level: string;
  birthdate: string;
  photo_url: string;
  created_at: string;
}

export default function SavedIDs() {
  const { user } = useAuth();
  const [savedIDs, setSavedIDs] = useState<SavedID[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSavedIDs();
    }
  }, [user]);

  const fetchSavedIDs = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/id-cards?user_id=${user.id}`);
      const data = await response.json();

      if (data.success) {
        setSavedIDs(data.cards || []);
      }
    } catch (error) {
      console.error('Error fetching saved IDs:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = async (card: SavedID) => {
    // Create a temporary card preview element and download it
    // This is a simplified version - you might want to enhance this
    alert(`Downloading ID card for ${card.student_name}`);
    // TODO: Implement actual download functionality
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold" style={{ color: '#003049' }}>
          My Saved IDs
        </h3>
        <div className="py-8 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (savedIDs.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold" style={{ color: '#003049' }}>
          My Saved IDs
        </h3>
        <div className="py-8 text-center">
          <p className="text-gray-500">No saved IDs yet. Create and save your first ID card!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold" style={{ color: '#003049' }}>
        My Saved IDs
      </h3>
      <div className="space-y-4">
        {savedIDs.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between rounded-lg border p-4"
            style={{ borderColor: '#e5e5e5' }}
          >
            <div className="flex-1">
              <h4 className="font-semibold" style={{ color: '#003049' }}>
                {card.student_name}
              </h4>
              <p className="text-sm text-gray-600">
                {card.student_id} • {card.course}
              </p>
              <p className="text-xs text-gray-500">
                Saved on {new Date(card.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => downloadCard(card)}
              className="ml-4 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: '#003049' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002439'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003049'}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

