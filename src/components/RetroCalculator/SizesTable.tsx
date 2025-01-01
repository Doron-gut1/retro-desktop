import React from 'react';
import { RetroSizeData } from '../../services/retro/types';

interface SizesTableProps {
  sizes: RetroSizeData;
  onSizeUpdate: (index: number, newSize: number) => void;
  onTariffUpdate: (index: number, newTariff: number) => void;
}

export const SizesTable: React.FC<SizesTableProps> = ({ sizes, onSizeUpdate, onTariffUpdate }) => {
  const rows = Array.from({ length: 8 }, (_, i) => i + 1)
    .filter(i => sizes[`gdl${i}` as keyof RetroSizeData] > 0);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">גדלים ותעריפים</h3>
      </div>
      
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-2 text-right border-b">מס׳</th>
              <th className="p-2 text-right border-b">גודל</th>
              <th className="p-2 text-right border-b">קוד תעריף</th>
              <th className="p-2 text-right border-b">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2">{i}</td>
                <td className="p-2">
                  <input 
                    type="number" 
                    className="w-20 p-1 border rounded" 
                    value={sizes[`gdl${i}` as keyof RetroSizeData]}
                    onChange={(e) => onSizeUpdate(i, Number(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      className="w-20 p-1 border rounded" 
                      value={sizes[`trf${i}` as keyof RetroSizeData]}
                      onChange={(e) => onTariffUpdate(i, Number(e.target.value))}
                    />
                  </div>
                </td>
                <td className="p-2">
                  <button className="text-red-600 hover:text-red-800">
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};