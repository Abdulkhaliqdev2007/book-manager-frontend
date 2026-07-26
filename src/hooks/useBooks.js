import { useState, useEffect, useCallback } from 'react';

import {
  fetchBooks,
  fetchBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../services/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState([]);

  // Loading states for each operation
  const [loadingStates, setLoadingStates] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  });

  // Error states for each operation
  const [errorStates, setErrorStates] = useState({
    fetch: null,
    create: null,
    update: null,
    delete: null,
  });

  const [currentBook, setCurrentBook] = useState(null);

  // Success message
  const [successMessage, setSuccessMessage] = useState(null);

  // Track which book is being deleted
  const [deletingId, setDeletingId] = useState(null);


  // Set loading state
  const setLoading = useCallback((operation, value) => {
    setLoadingStates((prev) => ({
      ...prev,
      [operation]: value,
    }));
  }, []);


  // Set error state
  const setError = useCallback((operation, message) => {
    setErrorStates((prev) => ({
      ...prev,
      [operation]: message,
    }));
  }, []);


  // Clear error
  const clearError = useCallback((operation) => {
    setErrorStates((prev) => ({
      ...prev,
      [operation]: null,
    }));
  }, []);


  // Clear success message
  const clearSuccess = useCallback(() => {
    setSuccessMessage(null);
  }, []);



  // GET ALL BOOKS
  const getAllBooks = useCallback(async () => {
    setLoading('fetch', true);
    setError('fetch', null);

    try {
      const data = await fetchBooks();
      setBooks(data);
      return data;

    } catch (err) {
      setError(
        'fetch',
        err.message || 'Failed to fetch books'
      );
      return [];

    } finally {
      setLoading('fetch', false);
    }

  }, [setLoading, setError]);



  // GET SINGLE BOOK
  const getBook = useCallback(async (id) => {
    setLoading('fetch', true);
    setError('fetch', null);

    try {
      const data = await fetchBookById(id);
      setCurrentBook(data);
      return data;

    } catch (err) {
      setError(
        'fetch',
        err.message || 'Failed to fetch book'
      );
      return null;

    } finally {
      setLoading('fetch', false);
    }

  }, [setLoading, setError]);



  // CREATE BOOK
  const addBook = useCallback(async (bookData) => {
    setLoading('create', true);
    setError('create', null);

    try {
      const newBook = await createBook(bookData);

      setBooks((prev) => [
        newBook,
        ...prev,
      ]);

      setSuccessMessage(
        'Book added successfully!'
      );

      return newBook;

    } catch (err) {
      setError(
        'create',
        err.message || 'Failed to create book'
      );
      throw err;

    } finally {
      setLoading('create', false);
    }

  }, [setLoading, setError]);



  // UPDATE BOOK
  const editBook = useCallback(async (id, bookData) => {
    setLoading('update', true);
    setError('update', null);

    try {
      const updatedBook = await updateBook(
        id,
        bookData
      );

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id
            ? updatedBook
            : book
        )
      );

      setCurrentBook(null);

      setSuccessMessage(
        'Book updated successfully!'
      );

      return updatedBook;

    } catch (err) {
      setError(
        'update',
        err.message || 'Failed to update book'
      );
      throw err;

    } finally {
      setLoading('update', false);
    }

  }, [setLoading, setError]);



  // DELETE BOOK
  const removeBook = useCallback(async (id) => {

    setDeletingId(id);
    setError('delete', null);

    try {

      await deleteBook(id);

      setBooks((prev) =>
        prev.filter(
          (book) => book._id !== id
        )
      );

      setSuccessMessage(
        'Book deleted successfully!'
      );

      return true;


    } catch (err) {

      setError(
        'delete',
        err.message || 'Failed to delete book'
      );

      throw err;


    } finally {

      setDeletingId(null);

    }

  }, [setError]);



  // SET BOOK FOR EDIT
  const setBookToEdit = useCallback((book) => {
    setCurrentBook(book);
  }, []);



  // Load books when page opens
  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);



  return {
    books,

    loadingStates,
    errorStates,

    currentBook,
    successMessage,
    deletingId,

    getAllBooks,
    getBook,

    addBook,
    editBook,
    removeBook,

    setBookToEdit,

    clearError,
    clearSuccess,
  };
};