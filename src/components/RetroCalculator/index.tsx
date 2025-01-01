import React, { useState, useEffect } from 'react';
import { Calculator, Check } from 'lucide-react';
import { PropertySearch } from './PropertySearch';
import { DateRange } from './DateRange';
import { ChargeTypes } from './ChargeTypes';
import { SizesTable } from './SizesTable';
import type { RetroSizeData } from '../../services/retro/types';
import { retroClient } from '../../services/ipc/retroClient';

export const RetroCalculator: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [propertyId, setPropertyId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [sizes, setSizes] = useState<RetroSizeData>({
    gdl1: 0, gdl2: 0, gdl3: 0, gdl4: 0, gdl5: 0, gdl6: 0, gdl7: 0, gdl8: 0,
    trf1: 0, trf2: 0, trf3: 0, trf4: 0, trf5: 0, trf6: 0, trf7: 0, trf8: 0
  });

  useEffect(() => {
    const connectToDb = async () => {
      try {
        // בנייה של מחרוזת החיבור מהמשתנים בקובץ .env
        const connectionString = `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};User Id=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};Encrypt=true;TrustServerCertificate=true;`;
        
        const result = await retroClient.connectDb(connectionString);
        setIsConnected(result.success);
        
        if (!result.success) {
          console.error('Failed to connect to DB:', result.error);
        }
      } catch (error) {
        console.error('Connection error:', error);
        setIsConnected(false);
      }
    };

    connectToDb();
  }, []);

  const handlePropertySelect = async (id: string) => {
    try {
      const property = await retroClient.getProperty(id);
      if (property) {
        setPropertyId(id);
        setSizes({
          gdl1: property.godel || 0,
          gdl2: property.gdl2 || 0,
          gdl3: property.gdl3 || 0,
          gdl4: property.gdl4 || 0,
          gdl5: property.gdl5 || 0,
          gdl6: property.gdl6 || 0,
          gdl7: property.gdl7 || 0,
          gdl8: property.gdl8 || 0,
          trf1: property.mas || 0,
          trf2: property.mas2 || 0,
          trf3: property.mas3 || 0,
          trf4: property.mas4 || 0,
          trf5: property.mas5 || 0,
          trf6: property.mas6 || 0,
          trf7: property.mas7 || 0,
          trf8: property.mas8 || 0
        });
      }
    } catch (error) {
      console.error('Error loading property:', error);
      // TODO: Add error notification
    }
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
    if (!propertyId || !startDate || !endDate || selectedTypes.length === 0) {
      // TODO: Show validation error
      return;
    }

    try {
      // First prepare the retro data
      await retroClient.prepareRetroData({
        hskod: propertyId,
        mspkod: 0 // TODO: Get from property data
      });

      // Then multiply rows
      await retroClient.multiplyTempArnmforatRows({
        hskod: propertyId,
        sugtsList: selectedTypes.join(','),
        isYearlyCharge: false // TODO: Add logic for yearly charges
      });

      // TODO: Show results
    } catch (error) {
      console.error('Calculation error:', error);
      // TODO: Show error notification
    }
  };

  const handleApprove = async () => {
    // TODO: Implement approval logic
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">מתחבר למסד הנתונים...</h2>
          <p className="text-gray-600">אנא המתן</p>
        </div>
      </div>
    );
  }

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