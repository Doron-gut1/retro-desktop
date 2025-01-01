import React from 'react';

interface ChargeType {
  id: number;
  name: string;
}

interface ChargeTypesProps {
  selectedTypes: number[];
  onTypeChange: (types: number[]) => void;
}

const CHARGE_TYPES: ChargeType[] = [
  { id: 1010, name: 'ארנונה' },
  { id: 1020, name: 'מים' },
  { id: 1030, name: 'ביוב' },
  { id: 1040, name: 'שמירה' }
];

export const ChargeTypes: React.FC<ChargeTypesProps> = ({ selectedTypes, onTypeChange }) => {
  const handleTypeToggle = (typeId: number) => {
    if (selectedTypes.includes(typeId)) {
      onTypeChange(selectedTypes.filter(id => id !== typeId));
    } else {
      onTypeChange([...selectedTypes, typeId]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">סוגי חיוב</label>
      <div className="border rounded p-2 space-y-2">
        {CHARGE_TYPES.map((type) => (
          <label key={type.id} className="flex items-center gap-2">
            <input 
              type="checkbox" 
              className="form-checkbox" 
              checked={selectedTypes.includes(type.id)}
              onChange={() => handleTypeToggle(type.id)}
            />
            <span>{type.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};