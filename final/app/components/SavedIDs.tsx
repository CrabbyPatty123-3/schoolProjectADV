'use client';

export default function SavedIDs() {
  // This will be populated when backend is ready
  const savedIDs: any[] = [];

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
        {/* Saved IDs will be displayed here when backend is ready */}
      </div>
    </div>
  );
}

