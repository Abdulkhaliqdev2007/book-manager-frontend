/**
 * services/bookService.js
 * 
 * All API calls related to books.
 * Uses the centralized api instance from api.js.
 */

import api from './api';

/**
 * Fetch all books from the API
 * @returns {Promise<Array>} Array of book objects
 */
export const fetchBooks = async () => {
  const response = await api.get('/books');
  return response.data.data;
};

/**
 * Fetch a single book by ID
 * @param {string} id - Book ID
 * @returns {Promise<Object>} Book object
 */
export const fetchBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data.data;
};

/**
 * Create a new book
 * @param {Object} bookData - Book data to create
 * @returns {Promise<Object>} Created book object
 */
export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data.data;
};

/**
 * Update an existing book
 * @param {string} id - Book ID
 * @param {Object} bookData - Updated book data
 * @returns {Promise<Object>} Updated book object
 */
export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data.data;
};

/**
 * Delete a book by ID
 * @param {string} id - Book ID
 * @returns {Promise<Object>} Deleted book object
 */
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data.data;
};
