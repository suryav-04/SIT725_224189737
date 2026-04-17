const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "ID is required"],
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: 2,
    maxlength: 100
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    minlength: 2,
    maxlength: 100
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
    min: 1000,
    max: new Date().getFullYear()
  },
  genre: {
    type: String,
    required: true,
    enum: ["Science Fiction", "Classic", "Historical Fiction", "Fantasy"]
  },
  summary: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

// reject unknown fields
bookSchema.set("strict", true);

module.exports = mongoose.model("Book", bookSchema);