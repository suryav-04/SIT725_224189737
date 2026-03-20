const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {
    res.send('🚀 Welcome to Calculator API using Express');
});


// Utility function (for validation)
function validateNumbers(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return false;
    }
    return true;
}


// ✅ ADDITION (MAIN REQUIRED)
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!validateNumbers(num1, num2)) {
        return res.status(400).send('❌ Invalid input. Please provide numbers.');
    }

    const result = num1 + num2;

    res.json({
        operation: "addition",
        num1,
        num2,
        result
    });
});


// ➖ SUBTRACTION
app.get('/sub', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!validateNumbers(num1, num2)) {
        return res.status(400).send('❌ Invalid input');
    }

    res.json({
        operation: "subtraction",
        result: num1 - num2
    });
});


// ✖️ MULTIPLICATION
app.get('/mul', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!validateNumbers(num1, num2)) {
        return res.status(400).send('❌ Invalid input');
    }

    res.json({
        operation: "multiplication",
        result: num1 * num2
    });
});


// ➗ DIVISION
app.get('/div', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!validateNumbers(num1, num2)) {
        return res.status(400).send('❌ Invalid input');
    }

    if (num2 === 0) {
        return res.status(400).send('❌ Cannot divide by zero');
    }

    res.json({
        operation: "division",
        result: num1 / num2
    });
});


// ✅ POST API (BONUS MARKS)
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    if (!validateNumbers(num1, num2)) {
        return res.status(400).send('❌ Invalid input');
    }

    let result;

    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'sub':
            result = num1 - num2;
            break;
        case 'mul':
            result = num1 * num2;
            break;
        case 'div':
            if (num2 === 0) {
                return res.status(400).send('❌ Cannot divide by zero');
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).send('❌ Invalid operation');
    }

    res.json({
        operation,
        num1,
        num2,
        result
    });
});


// Server Start
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});