const express = require('express');
const app = express();
const PORT = 3000;

const { calculateGrade } = require('./calculator');

// 👉 ADD THIS LINE
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("Grade API running");
});

app.get('/grade', (req, res) => {
  try {
    const marks = req.query.marks;

    if (!marks) {
      return res.status(400).send("Marks required");
    }

    const marksArray = marks.split(',').map(Number);

    if (marksArray.some(isNaN)) {
      return res.status(400).send("Invalid marks");
    }

    const result = calculateGrade(marksArray);
    res.json(result);

  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});