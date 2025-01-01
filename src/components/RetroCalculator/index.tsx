import React, { useState } from 'react';
import { PropertySearch } from '../PropertySearch';
import { SizesTable } from '../SizesTable';
import type { PropertySize } from '../../services/calculation/types';

export const RetroCalculator: React.FC = () => {
  const [propertyId, setPropertyId] = useState<string>('');
  const [sizes, setSizes] = useState<PropertySize[]>([]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">חישוב רטרו</h1>
      
      <PropertySearch 
        onSelect={(id) => setPropertyId(id)} 
      />

      {propertyId && (
        <SizesTable
          sizes={sizes}
          onUpdate={setSizes}
          onTariffSelect={async (id) => {
            // TODO: Implement tariff selection
            return null;
          }}
        />
      )}
    </div>
  );
};