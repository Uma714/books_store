const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// Create a new book
router.post('/', async (req, res) => {
    const { title, author, price } = req.body;
    try {
        const book = new Book({ title, author, price });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a book
router.put('/:id', async (req, res) => {
    const { title, author, price } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, price },
            { new: true }
        );
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
