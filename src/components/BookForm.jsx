/**
 * components/BookForm.jsx
 * 
 * Form component for adding and editing books.
 * Handles form validation, submission, and loading states.
 */

import React, { useState, useEffect } from 'react';
import { BookOpen, Save, X, Loader2 } from 'lucide-react';

const BookForm = ({ onSubmit, onCancel, initialData, loading }) => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    publishedYear: '',
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        genre: initialData.genre || '',
        price: initialData.price || '',
        publishedYear: initialData.publishedYear || '',
      });
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form before submission
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    if (formData.price && (isNaN(formData.price) || Number(formData.price) < 0)) {
      newErrors.price = 'Price must be a positive number';
    }
    if (formData.publishedYear && (isNaN(formData.publishedYear) || formData.publishedYear < 1000)) {
      newErrors.publishedYear = 'Enter a valid year';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const bookData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim() || 'Uncategorized',
      price: formData.price ? Number(formData.price) : 0,
      publishedYear: formData.publishedYear ? Number(formData.publishedYear) : new Date().getFullYear(),
    };

    onSubmit(bookData);
  };

  // Determine if we're in edit mode
  const isEditing = !!initialData;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">
            {isEditing ? 'Edit Book' : 'Add New Book'}
          </h2>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.title
                ? 'border-red-400 focus:ring-red-200'
                : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-500'
            } outline-none focus:ring-2 transition-all text-slate-800 placeholder-slate-400`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Author Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.author
                ? 'border-red-400 focus:ring-red-200'
                : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-500'
            } outline-none focus:ring-2 transition-all text-slate-800 placeholder-slate-400`}
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-500">{errors.author}</p>
          )}
        </div>

        {/* Genre Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g., Fiction, Science, History"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Price & Year Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.price
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-500'
              } outline-none focus:ring-2 transition-all text-slate-800 placeholder-slate-400`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Published Year
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder={new Date().getFullYear()}
              min="1000"
              max={new Date().getFullYear()}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.publishedYear
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-500'
              } outline-none focus:ring-2 transition-all text-slate-800 placeholder-slate-400`}
            />
            {errors.publishedYear && (
              <p className="mt-1 text-sm text-red-500">{errors.publishedYear}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Book' : 'Add Book'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-60"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
