const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/fitnessDB');

const FitnessSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String
});

const Fitness = mongoose.model('Fitness', FitnessSchema);

const data = [
  {
    title: "Morning Workout",
    image: "https://picsum.photos/200?random=41",
    description: "Start your day with cardio"
  },
  {
    title: "Strength Training",
    image: "https://picsum.photos/200?random=42",
    description: "Build muscles effectively"
  },
  {
    title: "Yoga Session",
    image: "https://picsum.photos/200?random=43",
    description: "Relax and improve flexibility"
  }
];

Fitness.insertMany(data)
  .then(() => {
    console.log("Data inserted");
    mongoose.connection.close();
  });