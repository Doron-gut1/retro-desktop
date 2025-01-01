import React from 'react';

interface Size {
  index: number;
  size: number;
  tariffCode: string;
  tariffName: string;
}

export const SizesTable: React.FC = () => {
  const [sizes, setSizes] = React.useState<Size[]>([
    { index: 1, size: 80, tariffCode: '101', tariffName: 'מגורים רגיל' },
    { index: 2, size: 20, tariffCode: '102', tariffName: 'מרפסת' },
    { index: 3, size: 15, tariffCode: '103', tariffName: 'מחסן' }
  ]);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">גדלים ותעריפים</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          עריכה מרוכזת
        </button>
      </div>
      
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-2 text-right border-b">מס׳</th>
              <th className="p-2 text-right border-b">גודל</th>
              <th className="p-2 text-right border-b">קוד תעריף</th>
              <th className="p-2 text-right border-b">שם תעריף</th>
              <th className="p-2 text-right border-b">תעריף</th>
              <th className="p-2 text-right border-b">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sizes.map((row) => (
              <tr key={row.index} className="hover:bg-gray-50">
                <td className="p-2">{row.index}</td>
                <td className="p-2">
                  <input 
                    type="number" 
                    className="w-20 p-1 border rounded" 
                    value={row.size}
                    onChange={(e) => {
                      const newSizes = [...sizes];
                      newSizes[row.index - 1].size = parseFloat(e.target.value);
                      setSizes(newSizes);
                    }}
                  />
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="w-20 p-1 border rounded" 
                      value={row.tariffCode}
                      readOnly
                    />
                    <button className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                      בחר
                    </button>
                  </div>
                </td>
                <td className="p-2">
                  <input 
                    type="text" 
                    className="w-full p-1 border rounded bg-gray-50" 
                    value={row.tariffName}
                    readOnly
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="text" 
                    className="w-24 p-1 border rounded bg-gray-50" 
                    value="100"
                    readOnly
                  />
                </td>
                <td className="p-2">
                  <button className="text-red-600 hover:text-red-800">
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={6} className="p-2">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  + הוסף גודל חדש
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="text-sm bg-gray-50 p-2 rounded flex justify-between">
        <span>סה"כ שטח:</span>
        <span className="font-medium">115 מ"ר</span>
      </div>
    </div>
  );
};