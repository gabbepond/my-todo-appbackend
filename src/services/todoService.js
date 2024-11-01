const API_URL = '/api/todos';

export async function getTodos() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function createTodo(todo) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return await response.json();
}

export async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
