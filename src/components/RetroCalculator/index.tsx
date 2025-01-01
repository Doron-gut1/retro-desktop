import React, { useState } from 'react';
import { Search, Calendar, FileText, Calculator, Check, X } from 'lucide-react';

export const RetroCalculator: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [sizes, setSizes] = useState([
    { id: 1, size: 80, tariffCode: '101', tariffName: 'מגורים רגיל', tariffAmount: '100' },
    { id: 2, size: 20, tariffCode: '102', tariffName: 'מרפסת', tariffAmount: '80' },
    { id: 3, size: 15, tariffCode: '103', tariffName: 'מחסן', tariffAmount: '50' }
  ]);

  return (
    <div dir="rtl" className="flex flex-col bg-white min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl mb-4 text-center">חישוב רטרו</h1>

        <div className="space-y-6">
          {/* Main Form Section */}
          <div>
            <div className="grid grid-cols-[2fr,1fr] gap-4">
              {/* Right Column - Search & Filters */}
              <div className="space-y-4">
                {/* Property Search */}
                <div className="flex gap-2 justify-end">
                  <input 
                    type="text" 
                    className="border p-1 w-64 text-right"
                    placeholder="הזן קוד נכס..."
                  />
                  <button className="p-1 px-4 border hover:bg-gray-50">חפש</button>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 justify-end">
                    <input 
                      type="text" 
                      className="border p-1 w-32 text-right"
                      placeholder="dd/mm/yyyy"
                    />
                    <label className="text-sm">תאריך התחלה</label>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <input 
                      type="text" 
                      className="border p-1 w-32 text-right"
                      placeholder="dd/mm/yyyy"
                    />
                    <label className="text-sm">תאריך סיום</label>
                  </div>
                </div>

                {/* Charge Types */}
                <div className="flex items-center gap-4 justify-end">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    <span>שמירה</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    <span>ביוב</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    <span>מים</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" />
                    <span>ארנונה</span>
                  </label>
                  <span>סוגי חיוב:</span>
                </div>
              </div>

              {/* Left Column - Action Buttons */}
              <div className="space-y-2">
                <button className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">חשב</button>
                <button className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">אשר</button>
              </div>
            </div>

            {/* Sizes & Tariffs Table */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <button className="text-sm text-blue-600 hover:underline">עריכה מרוכזת</button>
                <h2 className="text-lg font-medium">גדלים ותעריפים</h2>
              </div>

              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="p-2 text-right">מס׳</th>
                    <th className="p-2 text-right">גודל</th>
                    <th className="p-2 text-right">קוד תעריף</th>
                    <th className="p-2 text-right">שם תעריף</th>
                    <th className="p-2 text-right">תעריף</th>
                    <th className="p-2 text-right">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{row.id}</td>
                      <td className="p-2">
                        <input 
                          type="text" 
                          className="border p-1 w-16 text-right" 
                          value={row.size}
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            className="border p-1 w-20 text-right" 
                            value={row.tariffCode}
                          />
                          <button className="border px-2 py-1 text-sm hover:bg-gray-50">בחר</button>
                        </div>
                      </td>
                      <td className="p-2">
                        <input 
                          type="text" 
                          className="border p-1 w-full bg-gray-50" 
                          value={row.tariffName}
                          readOnly
                        />
                      </td>
                      <td className="p-2">
                        <input 
                          type="text" 
                          className="border p-1 w-20 text-right bg-gray-50" 
                          value={`₪${row.tariffAmount}`}
                          readOnly
                        />
                      </td>
                      <td className="p-2">
                        <button className="text-red-600 hover:text-red-800">מחק</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-4">
                <button className="text-blue-600 hover:underline">+ הוסף גודל חדש</button>
                <div className="text-sm">
                  <span>סה"כ שטח:</span>
                  <span className="font-medium mr-1">115 מ"ר</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};