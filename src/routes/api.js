// src/routes/api.js

const API_URL = 'http://localhost:3000/todos';

// Fetch all todos
export async function getTodos() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return await response.json();
}

// Create a new todo
export async function createTodo(todo) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return await response.json();
}

// Delete a todo by ID
export async function deleteTodo(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
}
