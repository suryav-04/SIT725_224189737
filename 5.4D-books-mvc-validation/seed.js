const mongoose = require("mongoose");
const Book = require("./models/book.model");

// Connect to DB (same as server.js)
mongoose.connect("mongodb://127.0.0.1:27017/booksDB");

// ⭐ IMPORTANT: same 5 books + price (AUD)
const books = [
  {
    id: "b1",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy.",
    price: mongoose.Types.Decimal128.fromString("29.99")
  },
  {
    id: "b2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "An orphaned governess confronts class, morality, and love.",
    price: mongoose.Types.Decimal128.fromString("22.00")
  },
  {
    id: "b3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Classic",
    summary: "Elizabeth Bennet and Mr. Darcy navigate pride and social expectations.",
    price: mongoose.Types.Decimal128.fromString("22.00")
  },
  {
    id: "b4",
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "In a ruined Italian villa, four strangers confront memory and loss.",
    price: mongoose.Types.Decimal128.fromString("25.39")
  },
  {
    id: "b5",
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "The god Om returns as a tortoise and explores belief and power.",
    price: mongoose.Types.Decimal128.fromString("31.99")
  }
];

async function seedData() {
  try {
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log("✅ Data seeded successfully");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

seedData();