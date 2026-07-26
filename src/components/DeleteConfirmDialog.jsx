/**
 * components/DeleteConfirmDialog.jsx
 * 
 * Confirmation dialog for deleting a book.
 * Prevents accidental deletions.
 */

import React from 'react';
import { AlertTriangle, X, Trash2, Loader2 } from 'lucide-react';

const DeleteConfirmDialog = ({ book, onConfirm, onCancel, loading }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-red-50 px-6 py-5 flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-red-800">Delete Book</h3>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-slate-600 leading-relaxed">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-800">"{book.title}"</span>
            {' '}by{' '}
            <span className="font-semibold text-slate-800">{book.author}</span>?
          </p>
          <p className="text-slate-500 text-sm mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
