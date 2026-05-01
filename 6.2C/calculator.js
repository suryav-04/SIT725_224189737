function calculateGrade(marks) {
  if (!Array.isArray(marks) || marks.length === 0) {
    throw new Error("Invalid input");
  }

  const avg = marks.reduce((a, b) => a + b, 0) / marks.length;

  let grade;
  if (avg >= 85) grade = "HD";
  else if (avg >= 75) grade = "D";
  else if (avg >= 65) grade = "C";
  else if (avg >= 50) grade = "P";
  else grade = "F";

  return { average: avg, grade };
}

module.exports = { calculateGrade };