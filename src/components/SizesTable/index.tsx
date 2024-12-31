import React from 'react';
import type { PropertySize, SizeUpdate } from '../../types/sizes';

interface SizesTableProps {
  sizes: PropertySize[];
  onUpdate: (update: SizeUpdate) => void;
}

export const SizesTable: React.FC<SizesTableProps> = ({ sizes, onUpdate }) => {
  return (
    <div className="border rounded">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2">מס'</th>
            <th className="p-2">גודל</th>
            <th className="p-2">תעריף</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size.index}>
              <td className="p-2">{size.index}</td>
              <td className="p-2">
                <input 
                  type="number" 
                  value={size.size}
                  onChange={(e) => onUpdate({
                    index: size.index,
                    size: Number(e.target.value)
                  })}
                />
              </td>
              <td className="p-2">{size.tariffCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}