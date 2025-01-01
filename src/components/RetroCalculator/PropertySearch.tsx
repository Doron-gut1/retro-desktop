import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface PropertySearchProps {
  onPropertySelect: (propertyId: string) => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({ onPropertySelect }) => {
  const [propertyId, setPropertyId] = useState('');

  const handleSearch = () => {
    if (propertyId.trim()) {
      onPropertySelect(propertyId);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">קוד נכס</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="הזן קוד נכס..."
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};