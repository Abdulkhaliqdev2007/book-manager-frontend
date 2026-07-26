/**
 * components/ErrorAlert.jsx
 * 
 * Reusable error alert component for displaying error messages.
 */

import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorAlert = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-red-700 text-sm font-medium">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
