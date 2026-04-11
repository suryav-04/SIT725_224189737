const express = require("express");
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(__dirname + '/public'));

// 🔥 FITNESS API
app.get('/api/items', (req, res) => {
  const items = [
    {
      title: "Morning Workout",
      image: "https://picsum.photos/200?random=21",
      description: "Start your day with stretching and cardio"
    },
    {
      title: "Strength Training",
      image: "https://picsum.photos/200?random=22",
      description: "Build muscles with weight exercises"
    },
    {
      title: "Yoga Session",
      image: "https://picsum.photos/200?random=23",
      description: "Relax your body and mind"
    }
  ];

  res.json(items);
});

// Start server
app.listen(port, () => {
  console.log("Server running on port " + port);
});