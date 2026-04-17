const bookService = require("../services/books.service");

//  Allowed fields (for safe writes)
const allowedFields = ["id", "title", "author", "year", "genre", "summary", "price"];

//  Check for unknown fields
function hasUnknownFields(body) {
  return Object.keys(body).some(key => !allowedFields.includes(key));
}


// 🔹 GET ALL BOOKS
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 GET BOOK BY ID
const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 CREATE BOOK (POST)
const createBook = async (req, res) => {
  try {
    // 🚫 Reject unknown fields
    if (hasUnknownFields(req.body)) {
      return res.status(400).json({ message: "Unknown fields not allowed" });
    }

    const book = await bookService.createBook(req.body);

    res.status(201).json(book);

  } catch (err) {
    
    if (err.code === 11000) {
      return res.status(409).json({ message: "Duplicate ID" });
    }

    // 🚫 Validation error
    res.status(400).json({ message: err.message });
  }
};


// 🔹 UPDATE BOOK (PUT)
const updateBook = async (req, res) => {
  try {
 
    if (hasUnknownFields(req.body)) {
      return res.status(400).json({ message: "Unknown fields not allowed" });
    }

   
    if (req.body.id) {
      return res.status(400).json({ message: "ID cannot be modified" });
    }

    const updatedBook = await bookService.updateBook(req.params.id, req.body);

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
};