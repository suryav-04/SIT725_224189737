const bookService = require("../services/books.service");

// GET ALL
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE BOOK
const createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (err) {

    if (err.code === 11000) {
      return res.status(409).json({ message: "Duplicate ID" });
    }

    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ error: err.message });
  }
};

// UPDATE BOOK
const updateBook = async (req, res) => {
  try {
    const id = req.params.id;

    // prevent ID change
    if (req.body.id && req.body.id !== id) {
      return res.status(400).json({ message: "ID cannot be changed" });
    }

    const updated = await bookService.updateBook(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updated);

  } catch (err) {

    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
};