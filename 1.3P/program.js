// Simple Student Information Program

console.log("=== Student Information System ===");

// Student details
let studentName = "Surya";
let studentID = 224189737;
let marks = [75, 82, 68, 90, 77];

// Function to calculate average marks
function calculateAverage(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total / arr.length;
}

let average = calculateAverage(marks);

// Determine grade
let grade;

if (average >= 85) {
    grade = "HD";
} else if (average >= 75) {
    grade = "Distinction";
} else if (average >= 65) {
    grade = "Credit";
} else if (average >= 50) {
    grade = "Pass";
} else {
    grade = "Fail";
}

// Display results
console.log("Student Name:", studentName);
console.log("Student ID:", studentID);
console.log("Marks:", marks);
console.log("Average Marks:", average.toFixed(2));
console.log("Grade:", grade);