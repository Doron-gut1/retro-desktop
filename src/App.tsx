import React from 'react';
import { RetroCalculator } from './components/RetroCalculator';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <RetroCalculator />
    </div>
  );
};