const express = require('express');
const router = express.Router();

let todos = [];  // In-memory storage

// Create
router.post('/', (req, res) => {
  const todo = req.body;
  todo.id = Date.now();
  todos.push(todo);
  res.json(todo);
});

// Read
router.get('/', (req, res) => res.json(todos));

// Update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  todos = todos.map(todo => (todo.id == id ? updatedTodo : todo));
  res.json(updatedTodo);
});

// Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.status(204).send();
});

module.exports = router;
