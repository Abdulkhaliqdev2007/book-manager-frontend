/**
 * App.jsx
 * 
 * Main application component that renders the Book Manager page.
 */

import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import BookManager from './pages/BookManager';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <BookManager />
      <Analytics />
    </div>
  );
}

export default App;
