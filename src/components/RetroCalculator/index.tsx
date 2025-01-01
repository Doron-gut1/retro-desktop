import React, { useState } from 'react';
import { Calculator, Check } from 'lucide-react';
import { PropertySearch } from './PropertySearch';
import { DateRange } from './DateRange';
import { ChargeTypes } from './ChargeTypes';
import { SizesTable } from './SizesTable';

export const RetroCalculator: React.FC = () => {
  const [propertyId, setPropertyId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);

  return (
    <div dir="rtl" className="flex flex-col bg-gray-50 min-h-screen text-right">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold">חישוב רטרו</h1>
      </div>
      
      <div className="flex flex-col p-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <PropertySearch onPropertySelect={setPropertyId} />
            </div>

            <div className="space-y-4">
              <DateRange
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
              <ChargeTypes
                selectedTypes={selectedTypes}
                onTypeChange={setSelectedTypes}
              />
            </div>

            <div className="flex flex-col justify-end gap-2">
              <button 
                className="bg-blue-600 text-white p-3 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <Calculator size={20} />
                חשב
              </button>
              <button 
                className="bg-green-600 text-white p-3 rounded flex items-center justify-center gap-2 hover:bg-green-700"
              >
                <Check size={20} />
                אשר
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};