const Book = require("../models/book.model");

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
  return await Book.findOne({ id });
};

const createBook = async (data) => {
  return await Book.create(data);
};

const updateBook = async (id, data) => {
  return await Book.findOneAndUpdate(
    { id },
    data,
    { returnDocument: "after", runValidators: true } // ✅ FIXED
  );
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
};