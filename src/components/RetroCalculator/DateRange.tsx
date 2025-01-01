import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const DateRange: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">תאריך התחלה</label>
        <div className="flex gap-2">
          <input 
            type="date" 
            className="flex-1 p-2 border rounded"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
          <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            <Calendar size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">תאריך סיום</label>
        <div className="flex gap-2">
          <input 
            type="date" 
            className="flex-1 p-2 border rounded"
            value={endDate}
            min={startDate}
            onChange={(e) => onEndDateChange(e.target.value)}
          />
          <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            <Calendar size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};