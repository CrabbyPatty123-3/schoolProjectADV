'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import EditIDModal from './EditIDModal';

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
  additional_info: string;
  include_qr_code: boolean;
  created_at: string;
}

export default function SavedIDs() {
  const { user } = useAuth();
  const [savedIDs, setSavedIDs] = useState<SavedID[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<SavedID | null>(null);

  useEffect(() => {
    if (user) {
      fetchSavedIDs();
    }
  }, [user]);

  // Listen for refresh events
  useEffect(() => {
    const handleRefresh = () => {
      if (user) {
        fetchSavedIDs();
      }
    };
    
    window.addEventListener('idCardSaved', handleRefresh);
    return () => window.removeEventListener('idCardSaved', handleRefresh);
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

  const handleEdit = (card: SavedID) => {
    setEditingCard(card);
  };

  const handleSaveEdit = async (updatedData: any) => {
    try {
      const response = await fetch(`/api/id-cards/${updatedData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEditingCard(null);
        fetchSavedIDs(); // Refresh the list
      } else {
        alert(data.error || 'Failed to update ID');
      }
    } catch (error) {
      console.error('Error updating ID:', error);
      alert('Failed to update ID. Please try again.');
    }
  };

  const handleDelete = async (cardId: number, studentName: string) => {
    if (!confirm(`Are you sure you want to delete the ID card for ${studentName}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/id-cards/${cardId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        fetchSavedIDs(); // Refresh the list
      } else {
        alert(data.error || 'Failed to delete ID');
      }
    } catch (error) {
      console.error('Error deleting ID:', error);
      alert('Failed to delete ID. Please try again.');
    }
  };

  const downloadCard = async (card: SavedID) => {
    // Create a temporary card element and download it
    const cardElement = document.createElement('div');
    cardElement.className = 'mx-auto w-[350px] overflow-hidden rounded-lg bg-white shadow-lg';
    cardElement.style.aspectRatio = '2/3';
    cardElement.innerHTML = `
      <div style="background-color: ${card.header_color}; padding: 12px 16px; text-align: center;">
        <h2 style="font-size: 14px; font-weight: bold; color: white; text-transform: uppercase;">${card.card_title}</h2>
      </div>
      <div style="padding: 20px;">
        <div style="text-align: center; margin-bottom: 16px;">
          ${card.photo_url ? `<img src="${card.photo_url}" alt="Student" style="width: 112px; height: 112px; border-radius: 50%; object-fit: cover; border: 3px solid #003049;" />` : '<div style="width: 112px; height: 112px; border-radius: 50%; background: #f0f0f0; border: 3px solid #003049; margin: 0 auto;"></div>'}
        </div>
        <div style="text-align: center; margin-bottom: 16px;">
          <h3 style="font-size: 24px; font-weight: bold; color: #003049; margin-bottom: 4px;">${card.student_name}</h3>
        </div>
        <div style="margin-bottom: 16px;">
          ${card.student_id ? `<div style="display: flex; border-bottom: 1px solid #e5e5e5; padding-bottom: 6px; margin-bottom: 10px;"><span style="font-size: 12px; font-weight: 600; color: #666; width: 96px;">STUDENT ID:</span><span style="font-size: 14px; font-weight: 500; color: #003049; flex: 1;">${card.student_id}</span></div>` : ''}
          ${card.course ? `<div style="display: flex; border-bottom: 1px solid #e5e5e5; padding-bottom: 6px; margin-bottom: 10px;"><span style="font-size: 12px; font-weight: 600; color: #666; width: 96px;">COURSE:</span><span style="font-size: 14px; font-weight: 500; color: #003049; flex: 1;">${card.course}</span></div>` : ''}
          ${card.year_level ? `<div style="display: flex; border-bottom: 1px solid #e5e5e5; padding-bottom: 6px; margin-bottom: 10px;"><span style="font-size: 12px; font-weight: 600; color: #666; width: 96px;">YEAR LEVEL:</span><span style="font-size: 14px; font-weight: 500; color: #003049; flex: 1;">${card.year_level}</span></div>` : ''}
          ${card.birthdate ? `<div style="display: flex; border-bottom: 1px solid #e5e5e5; padding-bottom: 6px; margin-bottom: 10px;"><span style="font-size: 12px; font-weight: 600; color: #666; width: 96px;">BIRTHDATE:</span><span style="font-size: 14px; font-weight: 500; color: #003049; flex: 1;">${new Date(card.birthdate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>` : ''}
        </div>
      </div>
    `;
    
    document.body.appendChild(cardElement);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardElement, {
        scale: 2,
        logging: false,
      } as any);
      
      const link = document.createElement('a');
      link.download = `school-id-card-${card.student_name}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Failed to download image. Please try again.');
    } finally {
      document.body.removeChild(cardElement);
    }
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
    <>
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
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleEdit(card)}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  style={{
                    borderColor: '#003049',
                    color: '#003049',
                    backgroundColor: 'white',
                    border: '1px solid #003049',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  title="Edit"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(card.id, card.student_name)}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  style={{
                    borderColor: '#c1121f',
                    color: '#c1121f',
                    backgroundColor: 'white',
                    border: '1px solid #c1121f',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  title="Delete"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => downloadCard(card)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: '#003049' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002439'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003049'}
                  title="Download"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingCard && (
        <EditIDModal
          isOpen={!!editingCard}
          onClose={() => setEditingCard(null)}
          cardData={editingCard}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}

