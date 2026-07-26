/**
 * components/EmptyState.jsx
 * 
 * Displayed when no books are available.
 */

import React from 'react';
import { Library } from 'lucide-react';

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-slate-100 p-4 rounded-full mb-4">
        <Library className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">No books yet</h3>
      <p className="text-slate-500 text-center max-w-sm mb-5">
        Your library is empty. Add your first book to get started!
      </p>
      <button
        onClick={onAddClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        Add Your First Book
      </button>
    </div>
  );
};

export default EmptyState;
