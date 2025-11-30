import React, { useState, useEffect } from 'react';
import { Book, Search, User, LogOut, CheckCircle, BookOpen, AlertCircle } from 'lucide-react';

export default function App() {
  // --- State Management (Simulating the Database) ---
  const [view, setView] = useState('login'); // login, dashboard, mybooks
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Initial dummy data for the system
  const [books, setBooks] = useState([
    { id: 101, title: "System Analysis & Design", author: "Dennis, Wixom", status: "Available", category: "CS" },
    { id: 102, title: "Introduction to Algorithms", author: "Cormen", status: "Available", category: "CS" },
    { id: 103, title: "Clean Code", author: "Robert C. Martin", status: "Borrowed", category: "Software" },
    { id: 104, title: "Database Management", author: "Raghu Ramakrishnan", status: "Available", category: "DB" },
    { id: 105, title: "Artificial Intelligence", author: "Russell & Norvig", status: "Available", category: "AI" },
  ]);

  const [myBooks, setMyBooks] = useState([]);

  // --- Actions ---

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication
    const username = e.target.username.value;
    if (username) {
      setCurrentUser(username);
      setView('dashboard');
      showNotification(`Welcome back, ${username}!`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
    setMyBooks([]);
    showNotification("Logged out successfully.");
  };

  const borrowBook = (bookId) => {
    // 1. Find the book
    const bookToBorrow = books.find(b => b.id === bookId);
    
    // 2. Update logic
    if (bookToBorrow && bookToBorrow.status === 'Available') {
      // Update global book list status
      const updatedBooks = books.map(b => 
        b.id === bookId ? { ...b, status: 'Borrowed' } : b
      );
      setBooks(updatedBooks);

      // Add to user's personal list
      setMyBooks([...myBooks, { ...bookToBorrow, status: 'Borrowed', dueDate: '2023-12-01' }]);
      
      showNotification(`Success: You borrowed "${bookToBorrow.title}"`);
    }
  };

  const returnBook = (bookId) => {
    // Remove from my books
    setMyBooks(myBooks.filter(b => b.id !== bookId));
    
    // Update global list back to available
    const updatedBooks = books.map(b => 
      b.id === bookId ? { ...b, status: 'Available' } : b
    );
    setBooks(updatedBooks);
    showNotification("Book returned successfully.");
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Components ---

  const Navbar = () => (
    <nav className="bg-blue-700 text-white p-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center space-x-2 font-bold text-xl">
        <BookOpen className="h-6 w-6" />
        <span>UniLibrary System</span>
      </div>
      <div className="flex items-center space-x-6">
        <button 
          onClick={() => setView('dashboard')}
          className={`hover:text-blue-200 ${view === 'dashboard' ? 'underline decoration-2 underline-offset-4' : ''}`}
        >
          Browse Books
        </button>
        <button 
          onClick={() => setView('mybooks')}
          className={`hover:text-blue-200 ${view === 'mybooks' ? 'underline decoration-2 underline-offset-4' : ''}`}
        >
          My Books ({myBooks.length})
        </button>
        <div className="flex items-center space-x-2 border-l border-blue-500 pl-6">
          <User className="h-5 w-5" />
          <span className="text-sm">{currentUser}</span>
          <button onClick={handleLogout} className="ml-4 text-xs bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );

  const LoginScreen = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-blue-600">
        <div className="text-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Book className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Library Portal</h1>
          <p className="text-gray-500 text-sm mt-1">System Analysis Project 2025</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID / Username</label>
            <input 
              name="username" 
              type="text" 
              required 
              placeholder="e.g. Student123"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Login to System</span>
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Restricted Access • University Library System v1.0</p>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => {
    const filteredBooks = books.filter(b => 
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Library Catalog</h2>
            <p className="text-gray-500">Search and borrow academic resources.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${book.category === 'CS' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                    {book.category}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${book.status === 'Available' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {book.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4">by {book.author}</p>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400">ISBN: 978-3-16-{book.id}</span>
                  {book.status === 'Available' ? (
                    <button 
                      onClick={() => borrowBook(book.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Borrow</span>
                    </button>
                  ) : (
                    <button disabled className="bg-gray-100 text-gray-400 text-sm px-4 py-2 rounded-md cursor-not-allowed">
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MyBooks = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Borrowed Books</h2>
      {myBooks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
          <Book className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">You haven't borrowed any books yet.</p>
          <button onClick={() => setView('dashboard')} className="mt-4 text-blue-600 font-medium hover:underline">
            Go to Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myBooks.map(book => (
            <div key={book.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{book.title}</h3>
                <p className="text-gray-600 text-sm">Due Date: <span className="text-red-600 font-medium">Dec 15, 2025</span></p>
              </div>
              <button 
                onClick={() => returnBook(book.id)}
                className="text-gray-500 hover:text-red-600 text-sm font-medium px-4 py-2 border border-gray-200 rounded hover:bg-red-50 transition"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-green-400" />
          <span>{notification}</span>
        </div>
      )}

      {view === 'login' ? (
        <LoginScreen />
      ) : (
        <>
          <Navbar />
          {view === 'dashboard' && <Dashboard />}
          {view === 'mybooks' && <MyBooks />}
        </>
      )}
    </div>
  );
}
