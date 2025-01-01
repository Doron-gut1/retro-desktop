import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DatabaseService } from '../../services/db';
import type { Property } from '../../types/property';

interface PropertySearchProps {
  onSelect: (propertyId: string) => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({ onSelect }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSearch = async () => {
    if (!value) return;
    
    setLoading(true);
    setError(undefined);

    try {
      onSelect(value); // בשלב זה רק נעביר את הערך, בהמשך נוסיף ולידציה מול הדאטהבייס
      setValue(''); // נאפס את השדה אחרי בחירה
    } catch (err) {
      setError('שגיאה בחיפוש נכס');
      console.error('Property search error:', err);
    } finally {
      setLoading(false);
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          className={`p-2 rounded transition-colors ${loading 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
          onClick={handleSearch}
          disabled={loading}
        >
          <Search size={20} />
        </button>
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};