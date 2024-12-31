import React, { useState } from 'react';
import { PropertySearch } from '../PropertySearch';
import { SizesTable } from '../SizesTable';
import { CalculationResults } from '../CalculationResults';

export const RetroCalculator: React.FC = () => {
  const [propertyId, setPropertyId] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = async () => {
    if (!propertyId) {
      alert('נא להזין קוד נכס');
      return;
    }
    setShowResults(true);
  };

  return (
    <div dir="rtl" className="flex flex-col bg-gray-50 min-h-screen text-right">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold">חישוב רטרו</h1>
      </div>
      
      <div className="flex flex-col p-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <PropertySearch 
            value={propertyId}
            onChange={setPropertyId}
          />
          <SizesTable />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCalculate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              חשב
            </button>
          </div>
        </div>

        {showResults && <CalculationResults />}
      </div>
    </div>
  );
};