import React, { useState } from 'react';
import { Calculator, Check } from 'lucide-react';
import { PropertySearch } from './PropertySearch';
import { DateRange } from './DateRange';
import { ChargeTypes } from './ChargeTypes';
import { SizesTable } from './SizesTable';
import type { RetroSizeData } from '../../services/retro/types';

export const RetroCalculator: React.FC = () => {
  const [propertyId, setPropertyId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [sizes, setSizes] = useState<RetroSizeData>({
    gdl1: 0, gdl2: 0, gdl3: 0, gdl4: 0, gdl5: 0, gdl6: 0, gdl7: 0, gdl8: 0,
    trf1: 0, trf2: 0, trf3: 0, trf4: 0, trf5: 0, trf6: 0, trf7: 0, trf8: 0
  });

  const handlePropertySelect = async (id: string) => {
    setPropertyId(id);
    // TODO: Load property sizes from DB
  };

  const handleSizeUpdate = (index: number, newSize: number) => {
    setSizes(prev => ({
      ...prev,
      [`gdl${index}`]: newSize
    }));
  };

  const handleTariffUpdate = (index: number, newTariff: number) => {
    setSizes(prev => ({
      ...prev,
      [`trf${index}`]: newTariff
    }));
  };

  const handleCalculate = async () => {
    // TODO: Implement calculation logic
  };

  const handleApprove = async () => {
    // TODO: Implement approval logic
  };

  return (
    <div dir="rtl" className="flex flex-col bg-gray-50 min-h-screen text-right">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold">חישוב רטרו</h1>
      </div>
      
      <div className="flex flex-col p-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-3 gap-6">
            {/* Property Search Column */}
            <div className="space-y-4">
              <PropertySearch onPropertySelect={handlePropertySelect} />
            </div>

            {/* Dates & Charge Types Column */}
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

            {/* Action Buttons Column */}
            <div className="flex flex-col justify-end gap-2">
              <button 
                onClick={handleCalculate}
                className="bg-blue-600 text-white p-3 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <Calculator size={20} />
                חשב
              </button>
              <button 
                onClick={handleApprove}
                className="bg-green-600 text-white p-3 rounded flex items-center justify-center gap-2 hover:bg-green-700"
              >
                <Check size={20} />
                אשר
              </button>
            </div>
          </div>

          {/* Sizes Table */}
          <SizesTable
            sizes={sizes}
            onSizeUpdate={handleSizeUpdate}
            onTariffUpdate={handleTariffUpdate}
          />
        </div>
      </div>
    </div>
  );
};