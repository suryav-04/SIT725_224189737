const Book = require("../models/book.model");

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
  return await Book.findOne({ id });
};

module.exports = { getAllBooks, getBookById };