const Book = require('../models/Book');

const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

const createBook = async (req, res) => {
    const { title, author, price } = req.body;
    const book = new Book({ title, author, price });
    await book.save();
    res.json(book);
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted' });
};

module.exports = { getBooks, createBook, deleteBook };
