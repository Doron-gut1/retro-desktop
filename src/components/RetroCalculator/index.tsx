import React, { useState } from 'react';
import '../../styles/retro.css';

export const RetroCalculator: React.FC = () => {
  const [propertyId, setPropertyId] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <div className="retro-ui p-2">
      <div className="retro-window">
        <div className="retro-header text-center">
          חישוב רטרו
        </div>

        <div className="p-4">
          {/* Property Search */}
          <div className="flex justify-end gap-2 mb-4">
            <input 
              type="text" 
              className="retro-input w-48" 
              placeholder="...הזן קוד נכס"
            />
            <button className="retro-button">חפש</button>
          </div>

          {/* Dates */}
          <div className="mb-4">
            <div className="flex justify-end items-center gap-2 mb-2">
              <input type="text" className="retro-input w-32" placeholder="dd/mm/yyyy" />
              <span>תאריך התחלה</span>
            </div>
            <div className="flex justify-end items-center gap-2">
              <input type="text" className="retro-input w-32" placeholder="dd/mm/yyyy" />
              <span>תאריך סיום</span>
            </div>
          </div>

          {/* Charge Types */}
          <div className="flex justify-end gap-4 mb-4">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="retro-checkbox" />
              <span>שמירה</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" className="retro-checkbox" />
              <span>ביוב</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" className="retro-checkbox" />
              <span>מים</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" className="retro-checkbox" />
              <span>ארנונה</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end mb-4">
            <button className="retro-button">אשר</button>
            <button className="retro-button">חשב</button>
          </div>

          {/* Sizes Table */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <button className="retro-button">עריכה מרוכזת</button>
              <h2>גדלים ותעריפים</h2>
            </div>

            <table className="retro-table w-full">
              <thead>
                <tr>
                  <th>מס׳</th>
                  <th>גודל</th>
                  <th>קוד תעריף</th>
                  <th>שם תעריף</th>
                  <th>תעריף</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <input type="text" className="retro-input w-16" value="80" readOnly />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <input type="text" className="retro-input w-16" value="101" readOnly />
                      <button className="retro-button">בחר</button>
                    </div>
                  </td>
                  <td>
                    <input type="text" className="retro-input w-full" value="מגורים רגיל" readOnly />
                  </td>
                  <td>
                    <input type="text" className="retro-input w-16" value="₪100" readOnly />
                  </td>
                  <td>
                    <button className="retro-button">מחק</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between mt-2">
              <button className="retro-button">+ הוסף גודל חדש</button>
              <div>
                <span>סה"כ שטח: </span>
                <span className="font-bold">115 מ"ר</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};