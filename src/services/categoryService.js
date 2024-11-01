const API_URL = '/api/categories';

// Fetch all categories
export async function getCategories() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return await response.json();
}

// Create a new category
export async function createCategory(category) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to create category');
  return await response.json();
}

// Update an existing category
export async function updateCategory(id, updatedCategory) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCategory),
  });
  if (!response.ok) throw new Error('Failed to update category');
  return await response.json();
}

// Delete a category
export async function deleteCategory(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete category');
  return response.status === 204;
}
