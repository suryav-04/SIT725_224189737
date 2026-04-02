const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔥 Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/fitnessDB');

mongoose.connection.on('connected', () => {
  console.log("Connected to MongoDB");
});

// 🔥 Schema
const FitnessSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String
});

// 🔥 Model
const Fitness = mongoose.model('Fitness', FitnessSchema);

// 🔥 GET API (FROM DATABASE)
app.get('/api/items', async (req, res) => {
  const items = await Fitness.find({});
  res.json(items);
});

// Start server
app.listen(port, () => {
  console.log("Server running on port " + port);
});