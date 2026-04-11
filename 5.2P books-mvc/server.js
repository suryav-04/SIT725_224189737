const express = require("express");
const app = express();
const booksRoutes = require("./routes/books.routes");

app.use(express.json());

// serve frontend
app.use(express.static("public"));

// API routes
app.use("/api", booksRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});