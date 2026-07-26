import React, { useState } from 'react';

import {
  Plus,
  RefreshCw,
  Library,
  CheckCircle,
  X,
  Search
} from 'lucide-react';

import { useBooks } from '../hooks/useBooks';

import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import EmptyState from '../components/EmptyState';


const BookManager = () => {


  const {
    books,
    loadingStates,
    errorStates,
    currentBook,
    successMessage,
    deletingId,

    getAllBooks,
    addBook,
    editBook,
    removeBook,

    setBookToEdit,
    clearError,
    clearSuccess,

  } = useBooks();



  const [showForm, setShowForm] = useState(false);

  const [bookToDelete, setBookToDelete] = useState(null);



  // Search & Sort states

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOption, setSortOption] = useState("default");




  const handleAddBook = async (bookData) => {

    try {

      await addBook(bookData);

      setShowForm(false);


    } catch (err) {

      console.error("Add book failed:", err);

    }

  };





  const handleUpdateBook = async (bookData) => {

    try {

      await editBook(currentBook._id, bookData);

      setShowForm(false);


    } catch (err) {

      console.error("Update book failed:", err);

    }

  };





  const handleEditClick = (book) => {


    setBookToEdit(book);

    setShowForm(true);


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });


  };





  const handleDeleteClick = (bookId) => {


    const book = books.find(

      (item) => item._id === bookId

    );


    setBookToDelete(book);


  };





  const handleConfirmDelete = async () => {


    if (!bookToDelete) return;



    try {


      await removeBook(bookToDelete._id);


      setBookToDelete(null);



    } catch (err) {


      console.error(

        "Delete book failed:",

        err

      );


    }


  };





  const handleCancelForm = () => {


    setShowForm(false);

    setBookToEdit(null);


  };





  const handleRefresh = () => {


    getAllBooks();


  };




// Search + Sorting Logic

const filteredBooks = books
  .filter((book) =>
    (book.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (book.author || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {

    if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    }

    if (sortOption === "title-desc") {
      return b.title.localeCompare(a.title);
    }

    if (sortOption === "year-new") {
      return Number(b.publishedYear) - Number(a.publishedYear);
    }

    if (sortOption === "year-old") {
      return Number(a.publishedYear) - Number(b.publishedYear);
    }

    return 0;

  });





  return (    <div className="min-h-screen bg-slate-50">


      {/* Header */}

      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">

          <div className="flex items-center justify-between">


            <div className="flex items-center gap-3">

              <div className="bg-indigo-600 p-2 rounded-lg">

                <Library className="w-6 h-6 text-white" />

              </div>


              <div>

                <h1 className="text-xl font-bold text-slate-900">
                  Book Manager
                </h1>

                <p className="text-sm text-slate-500 hidden sm:block">
                  Manage your personal library
                </p>

              </div>

            </div>



            <div className="flex items-center gap-2">


              <button

                onClick={handleRefresh}

                disabled={loadingStates.fetch}

                className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded-lg disabled:opacity-50"

              >

                <RefreshCw
                  className={`w-4 h-4 ${
                    loadingStates.fetch
                      ? "animate-spin"
                      : ""
                  }`}
                />

                <span className="hidden sm:inline">
                  Refresh
                </span>

              </button>



              <button

                onClick={() => {

                  setBookToEdit(null);

                  setShowForm(true);

                }}

                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"

              >

                <Plus className="w-4 h-4"/>

                <span className="hidden sm:inline">
                  Add Book
                </span>

              </button>


            </div>


          </div>

        </div>

      </header>





      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">



        {/* Success Message */}

        {successMessage && (

          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-center gap-3">

            <CheckCircle className="w-5 h-5 text-emerald-500"/>

            <p className="flex-1 text-emerald-700 text-sm font-medium">

              {successMessage}

            </p>


            <button onClick={clearSuccess}>

              <X className="w-4 h-4"/>

            </button>


          </div>

        )}






        {/* Error */}

        {errorStates.fetch && (

          <ErrorAlert

            message={errorStates.fetch}

            onDismiss={() => clearError("fetch")}

          />

        )}







        {/* Form */}

        {showForm && (

          <div className="mb-8">


            <BookForm

              onSubmit={
                currentBook
                  ? handleUpdateBook
                  : handleAddBook
              }

              onCancel={handleCancelForm}

              initialData={currentBook}

              loading={
                currentBook
                  ? loadingStates.update
                  : loadingStates.create
              }

            />



            {errorStates.create && (

              <ErrorAlert

                message={errorStates.create}

                onDismiss={() => clearError("create")}

              />

            )}



            {errorStates.update && (

              <ErrorAlert

                message={errorStates.update}

                onDismiss={() => clearError("update")}

              />

            )}



          </div>

        )}







        {/* Search and Sort */}

        {books.length > 0 && (

          <div className="flex flex-col sm:flex-row gap-4 mb-6">


            <div className="relative flex-1">


              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400"/>


              <input

                type="text"

                placeholder="Search by title or author..."

                value={searchTerm}

                onChange={(e)=>setSearchTerm(e.target.value)}

                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

              />


            </div>





            <select

              value={sortOption}

              onChange={(e)=>setSortOption(e.target.value)}

              className="border border-slate-300 rounded-lg px-4 py-2 bg-white"

            >

              <option value="default">
                Sort By
              </option>


              <option value="title-asc">
                Title A-Z
              </option>


              <option value="title-desc">
                Title Z-A
              </option>


              <option value="year-new">
                Newest Year
              </option>


              <option value="year-old">
                Oldest Year
              </option>


            </select>


          </div>

        )}







        {/* Books */}

        {loadingStates.fetch && books.length === 0 ? (

          <LoadingSpinner message="Loading your library..." />

        ) : books.length === 0 ? (

          <EmptyState

            onAddClick={() => setShowForm(true)}

          />

        ) : (

          <>


            <h2 className="text-lg font-semibold text-slate-800 mb-4">

              Your Books ({filteredBooks.length})

            </h2>





            {filteredBooks.length === 0 ? (

              <p className="text-slate-500">

                No books found.

              </p>

            ) : (


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


                {filteredBooks.map((book)=>(


                  <BookCard

                    key={book._id}

                    book={book}

                    onEdit={handleEditClick}

                    onDelete={handleDeleteClick}

                    loading={deletingId === book._id}

                  />


                ))}


              </div>


            )}


          </>

        )}




      </main>







      <DeleteConfirmDialog

        book={bookToDelete}

        onConfirm={handleConfirmDelete}

        onCancel={() => setBookToDelete(null)}

        loading={deletingId === bookToDelete?._id}

      />





    </div>

  );
    };

export default BookManager;