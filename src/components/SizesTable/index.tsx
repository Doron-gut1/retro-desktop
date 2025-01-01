import React, { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import type { TariffData } from '../../services/tariff';
import type { PropertySize } from '../../services/calculation';

interface SizesTableProps {
  sizes: PropertySize[];
  onUpdate: (sizes: PropertySize[]) => void;
  onTariffSelect: (sizeId: number) => Promise<TariffData | null>;
}

export const SizesTable: React.FC<SizesTableProps> = ({ 
  sizes, 
  onUpdate,
  onTariffSelect 
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const handleSizeChange = (id: number, newSize: number) => {
    const updatedSizes = sizes.map(size => 
      size.index === id ? { ...size, size: newSize } : size
    );
    onUpdate(updatedSizes);
  };

  const handleTariffSelect = async (id: number) => {
    const tariff = await onTariffSelect(id);
    if (tariff) {
      const updatedSizes = sizes.map(size => 
        size.index === id ? {
          ...size,
          tariffCode: tariff.code,
        } : size
      );
      onUpdate(updatedSizes);
    }
  };

  const handleRemoveSize = (id: number) => {
    const updatedSizes = sizes.filter(size => size.index !== id);
    onUpdate(updatedSizes);
  };

  const addNewSize = () => {
    const newId = Math.max(...sizes.map(s => s.index), 0) + 1;
    const newSize: PropertySize = {
      index: newId,
      size: 0,
      tariffCode: ''
    };
    onUpdate([...sizes, newSize]);
  };

  const totalSize = sizes.reduce((sum, size) => sum + size.size, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">גדלים ותעריפים</h3>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={addNewSize}
        >
          <Plus className="inline h-4 w-4 mr-1" />
          הוסף גודל חדש
        </button>
      </div>
      
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-2 text-right">מס׳</th>
              <th className="p-2 text-right">גודל</th>
              <th className="p-2 text-right">קוד תעריף</th>
              <th className="p-2 text-right">שם תעריף</th>
              <th className="p-2 text-right">תעריף</th>
              <th className="p-2 text-right">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sizes.map((size) => (
              <tr key={size.index} className="hover:bg-gray-50">
                <td className="p-2">{size.index}</td>
                <td className="p-2">
                  <input 
                    type="number"
                    className="w-20 p-1 border rounded"
                    value={size.size}
                    onChange={(e) => handleSizeChange(size.index, Number(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      className="w-20 p-1 border rounded bg-gray-50"
                      value={size.tariffCode}
                      readOnly
                    />
                    <button 
                      className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                      onClick={() => handleTariffSelect(size.index)}
                    >
                      <Search className="inline h-3 w-3" />
                      בחר
                    </button>
                  </div>
                </td>
                <td className="p-2">
                  <input 
                    type="text"
                    className="w-full p-1 border rounded bg-gray-50"
                    value={size.tariffName || ''}
                    readOnly
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="text"
                    className="w-24 p-1 border rounded bg-gray-50"
                    value={size.tariffAmount ? `₪${size.tariffAmount.toFixed(2)}` : ''}
                    readOnly
                  />
                </td>
                <td className="p-2">
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleRemoveSize(size.index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm bg-gray-50 p-2 rounded flex justify-between">
        <span>סה"כ שטח:</span>
        <span className="font-medium">{totalSize.toFixed(1)} מ"ר</span>
      </div>
    </div>
  );
};