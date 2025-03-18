import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data);
  };

  const handleAddBook = async (book) => {
    const res = await axios.post('http://localhost:5000/api/books', book);
    setBooks([...books, res.data]);
  };

  const handleUpdateBook = async (id, updatedBook) => {
    const res = await axios.put(`http://localhost:5000/api/books/${id}`, updatedBook);
    setBooks(books.map((book) => (book._id === id ? res.data : book)));
  };

  const handleDeleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    setBooks(books.filter((book) => book._id !== id));
  };

  return (
    <div>
      <h1>Bookstore App</h1>
      <AddBook onAddBook={handleAddBook} />
      <BookList books={books} onDeleteBook={handleDeleteBook} onUpdateBook={handleUpdateBook} />
    </div>
  );
}

export default App;
