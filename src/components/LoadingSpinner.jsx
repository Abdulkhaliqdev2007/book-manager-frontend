/**
 * components/LoadingSpinner.jsx
 * 
 * Reusable loading spinner component for various loading states.
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 className={`${sizeClasses[size]} text-indigo-600 animate-spin`} />
      <p className="text-slate-500 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
