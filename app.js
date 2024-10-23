const express = require('express');
const app = express();
app.use(express.json());

const factorial = (n) => {
    if (n < 0) return "Input must be a non-negative integer.";
    if (n === 0) return 1;
    return n === 1 ? 1 : n * factorial(n - 1);
};

app.post('/calculateFactorial', (req, res) => {
    const { input } = req.body;
    if (typeof input !== 'number' || input < 0) {
        return res.status(400).json({ error: 'Input must be a non-negative integer.' });
    }
    const output = factorial(input);
    res.json({ input, output });
});

app.get('/calculateFactorial', (req, res) => {
    res.json({
        name: "calculateFactorial",
        description: "Calculates the factorial of a given non-negative integer.",
        input: {
            type: "number",
            description: "The number you want to calculate the factorial for",
            example: 5
        },
        output: {
            type: "number",
            description: "The factorial of the input number",
            example: 120
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});