const express = require("express");
const mongoose = require("mongoose");
const app = express();

const booksRoutes = require("./routes/books.routes");

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/booksDB");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

app.use("/api", booksRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});