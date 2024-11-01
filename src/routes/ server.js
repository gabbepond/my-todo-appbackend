const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Routes
const todoRoutes = require('./routes/todos');
const categoryRoutes = require('./routes/categories');

app.use('/api/todos', todoRoutes);
app.use('/api/categories', categoryRoutes);

// Serve Svelte front end from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other requests by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
