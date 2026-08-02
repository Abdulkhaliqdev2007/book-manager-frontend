# Book Manager - Frontend

A modern Book Management application frontend built with React, Vite, Tailwind CSS, and Axios. The application allows users to authenticate and manage their personal book collection through a clean and responsive user interface.
## Features
* User Authentication
  * User Signup
  * User Login
  * JWT token-based authentication
  * Protected routes
* Book Management
  * View all books
  * Add new books
  * Update existing books
  * Delete books
  * Search books
  * Sort books
* User Experience
  * Responsive design
  * Loading states
  * Error handling
  * Success messages
  * Clean component-based architecture
## Tech Stack
* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* JavaScript (ES6+)
## Project Structure
```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── BookCard.jsx
│   ├── BookForm.jsx
│   └── PrivateRoute.jsx
│
├── hooks/
│   ├── useBooks.js
│   └── useAuth.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── BookManager.jsx
│   └── NotFound.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── bookService.js
│
└── App.jsx
```
## Installation
Clone the repository:

```bash
git clone https://github.com/Abdulkhaliqdev2007/book-manager-frontend.git
```
Navigate to the project folder:

```bash
cd book-manager-frontend
```
Install dependencies:
```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```
Replace the URL with your deployed backend URL when deploying.

## Run the Application

Start the development server:

```bash
npm run dev
```

The application will run on:

```
http://localhost:5173
```

## Backend Repository

Backend API repository:

```
https://github.com/Abdulkhaliqdev2007/book-manager-backend.git
```

## Deployment

The frontend can be deployed using platforms like:

* Vercel
* Netlify

Make sure to add the environment variable:

```
VITE_API_URL
```
with your backend API URL before deployment.
## Future Improvements
* Add book categories
* Add pagination
* Add user profile page
* Improve UI animations
## Author
 Hafiz Abdul Khaliq
 GitHub: Abdulkhaliqdev2007
