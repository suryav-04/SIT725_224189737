const mongoose = require("mongoose");
const Book = require("./models/book.model");

// Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/booksDB");


const books = [
  {
    id: "b1",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy. The series portrays a fictional past, present, and future where first contact with an alien civilization from a system of three sun-like stars orbiting one another has profound consequences for humanity.",
    price: mongoose.Types.Decimal128.fromString("29.99")
  },
  {
    id: "b2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "Jane Eyre follows an orphaned girl who grows into a governess and develops strong moral values. She faces hardships, social class barriers, and emotional struggles while maintaining her independence and sense of self.",
    price: mongoose.Types.Decimal128.fromString("22.00")
  },
  {
    id: "b3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Classic",
    summary: "Pride and Prejudice centers on Elizabeth Bennet and her evolving relationship with Mr. Darcy. It explores themes of love, reputation, and social class in early 19th-century England.",
    price: mongoose.Types.Decimal128.fromString("22.00")
  },
  {
    id: "b4",
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "Set in a ruined Italian villa during World War II, The English Patient tells the story of four individuals whose lives intersect as they confront memory, identity, and loss.",
    price: mongoose.Types.Decimal128.fromString("25.39")
  },
  {
    id: "b5",
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "Small Gods follows the god Om, who returns to the world in the form of a tortoise. With the help of a novice named Brutha, the story explores religion, belief, and power in a satirical fantasy setting.",
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
