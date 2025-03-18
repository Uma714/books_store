import React, { useState } from 'react';

const BookList = ({ books, onDeleteBook, onUpdateBook }) => {
  const [editBook, setEditBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', price: '' });

  const handleEditClick = (book) => {
    setEditBook(book._id);
    setFormData({ title: book.title, author: book.author, price: book.price });
  };

  const handleUpdate = () => {
    onUpdateBook(editBook, formData);
    setEditBook(null);
    setFormData({ title: '', author: '', price: '' }); // ✅ Clear after update
  };

  const handleCancel = () => {
    setEditBook(null);
    setFormData({ title: '', author: '', price: '' }); // ✅ Clear on cancel
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {books
        .filter((book) => book.title && book.author && book.price) // ✅ Remove empty entries
        .map((book) => (
          <li key={book._id} style={{ marginBottom: '10px' }}>
            {editBook === book._id ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ marginRight: '10px' }}
                />
                <input
                  type="text"
                  placeholder="Enter Author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  style={{ marginRight: '10px' }}
                />
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  style={{ marginRight: '10px' }}
                />
                <button onClick={handleUpdate} style={{ marginRight: '5px' }}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ marginRight: '20px' }}>{book.title}</span>
                <span style={{ marginRight: '20px' }}>{book.author}</span>
                <span style={{ marginRight: '20px' }}>₹{book.price}</span>
                <button onClick={() => handleEditClick(book)} style={{ marginRight: '5px' }}>
                  Edit
                </button>
                <button onClick={() => onDeleteBook(book._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
    </ul>
  );
};

export default BookList;
