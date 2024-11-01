const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory todos array to simulate a database
let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    const newTodo = { ...req.body, id: Date.now().toString() };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});
