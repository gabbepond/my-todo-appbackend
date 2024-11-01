<script>
    import { onMount } from 'svelte';
    import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService.js';
  
    let todos = [];
    let newTodo = '';
  
    onMount(async () => {
      todos = await getTodos();
    });
  
    async function addTodo() {
      const todo = await createTodo({ title: newTodo });
      todos = [...todos, todo];
      newTodo = '';
    }
  
    async function removeTodo(id) {
      await deleteTodo(id);
      todos = todos.filter(todo => todo.id !== id);
    }
  </script>
  
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold">Todo List</h1>
    <input bind:value={newTodo} class="border p-2" placeholder="New todo" />
    <button on:click={addTodo} class="bg-blue-500 text-white px-4 py-2">Add</button>
    
    <ul>
      {#each todos as todo (todo.id)}
        <li>
          {todo.title}
          <button on:click={() => removeTodo(todo.id)} class="bg-red-500 text-white px-2">Delete</button>
        </li>
      {/each}
    </ul>
  </div>
  
  <style>
    /* Add TailwindCSS classes for styling */
  </style>
  