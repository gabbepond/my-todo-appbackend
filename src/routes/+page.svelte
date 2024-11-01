<script>
    import { onMount } from 'svelte';
    import { getTodos, createTodo, deleteTodo as deleteTodoAPI } from './api';
	

    let todoName = '';
    let selectedCategory = '';
    let selectedDate = '';
    let errorMessage = '';
    let todos = [];

    let categories = ['Personal', 'Work', 'School', 'Fitness'];
    let newTodo = '';
    let newCategory = '';
    let newDate = '';
    let customCategory = '';
    let addingNewCategory = false;
    let showDropdown = false;
    let editingId = null;
    let editedTodo = { name: '', date: '' };
    let editingText = '';

    // Fetch todos on component load
    onMount(async () => {
        try {
            todos = await getTodos();
        } catch (error) {
            errorMessage = 'Failed to load todos';
        }
    });

    // Add a new todo using the createTodo API
    async function addTodo() {
        if (newTodo.trim() && newCategory.trim() && newDate.trim()) {
            const todo = {
                name: newTodo,
                status: 'Incomplete',
                category: newCategory,
                date: newDate,
                completed: false,
            };

            try {
                const addedTodo = await createTodo(todo);
                todos = [...todos, addedTodo]; // Add new todo to the list
                newTodo = '';
                newCategory = '';
                newDate = '';
                showDropdown = false;
            } catch (error) {
                errorMessage = 'Failed to add todo';
            }
        } else {
            alert('Todo Name, Category, and Date must have a value.');
        }
    }

    // Delete a todo using the deleteTodo API
    async function deleteTodo(id) {
        try {
            await deleteTodoAPI(id);
            todos = todos.filter(todo => todo.id !== id); // Remove deleted todo from the list
        } catch (error) {
            errorMessage = 'Failed to delete todo';
        }
    }

    // Add a new custom category
    function addCategory() {
        if (customCategory.trim() && !categories.includes(customCategory)) {
            categories = [...categories, customCategory];
            newCategory = customCategory;
            customCategory = '';
            addingNewCategory = false;
            showDropdown = false;
        }
    }

    // Handle category selection
    function handleCategoryChange(category) {
        newCategory = category;
        addingNewCategory = false;
        showDropdown = false;
    }

    // Handle keypress (enter) for adding todo
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addTodo();
        }
    }

    // Start editing a todo
    function startEditing(id, name) {
        editingId = id;
        editingText = name;
    }

    // Save edited todo
    function saveEdit(id) {
        if (editingText.trim()) {
            todos = todos.map(todo =>
                todo.id === id ? { ...todo, name: editingText } : todo
            );
            cancelEdit();
        }
    }

    // Cancel editing
    function cancelEdit() {
        editingId = null;
        editingText = '';
    }

    // Toggle complete/incomplete todo
    function toggleComplete(id) {
        todos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed, status: todo.completed ? 'Incomplete' : 'Complete' } : todo
        );
    }

    // Clear all completed todos
    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
    }

    // Calculate remaining todos
    $: remainingTodos = todos.filter(todo => !todo.completed).length;
</script>

<!-- The rest of your HTML remains mostly the same, displaying todos and handling inputs -->
<main>
    <h1 class="text-white text-3xl p-6 text-center">Todo App</h1>

    <!-- Add Todo Section -->
    <div class="text-center mb-8 text-black">
        <input class="rounded-md"
            type="text"
            bind:value={newTodo}
            on:keypress={handleKeyPress}
            placeholder="Todo Name"
        >
       
        <div class="dropdown">
            <button class="dropdown-button mt-4 bg-blue-500 p-2 rounded-md text-white" on:click={() => showDropdown = !showDropdown}>
                {newCategory || 'Select Category'}
            </button>
            {#if showDropdown}
                <div class="flex justify-center">
                <ul class="dropdown-menu border-spacing-5 bg-white text-blue-800 p-2 rounded-md text-left">
                    {#each categories as category}
                        <li class="categorylist">
                            <button on:click={() => deleteCategory(category)} class="bg-red-500 text-white mt-2 pl-2 pr-2 rounded text-xl">x </button>
                            <span
                                on:click={() => handleCategoryChange(category)}
                                class="hover:text-blue-500 cursor-pointer transition-colors"
                            >
                                {category}
                            </span>
                        </li>
                    {/each}
                    <li>
                        {#if addingNewCategory}
                            <input class="mt-2"
                                type="text"
                                bind:value={customCategory}
                                placeholder="New Category"
                                on:keypress={(e) => { if (e.key === 'Enter') addCategory(); }}
                            />
                            <button on:click={addCategory} class="bg-green-500 text-white p-2 rounded">Add</button>
                        {:else}
                            <button class="bg-blue-500 rounded-md p-2 mt-2 text-white" on:click={() => addingNewCategory = true}>+ Add New Category</button>
                        {/if}
                    </li>
                </ul>
                </div>
            {/if}
        </div>
        
        <div class="text-center mt-8 text-black">
            <input class="rounded-md"
                type="date"
                bind:value={newDate}
                placeholder="Due Date"
            />
        </div>
        <div class="text-center mt-8">
            <button on:click={addTodo} class="bg-blue-500 text-white p-2 rounded">Add Todo</button>
        </div>
    </div>

    <!-- Todo List -->
    <div class="text-center">
        <ul>
            {#each todos as { id, name, status, category, date, completed }}
                <li>
                    <input type="checkbox" checked={completed} on:change={() => toggleComplete(id)} />

                    {#if editingId === id}
                        <input
                            type="text"
                            bind:value={editingText}
                            on:blur={() => saveEdit(id)}
                            on:keypress={(e) => handleEditKeyPress(e, id)}
                            autofocus
                            class="border rounded p-2 text-black"
                        />
                        <button on:click={() => saveEdit(id)} class="bg-green-500 text-white p-2 rounded">Save</button>
                        <button on:click={cancelEdit} class="bg-red-500 text-white p-2 rounded">Cancel</button>
                    {:else}
                        <span
                            on:dblclick={() => startEditing(id, name)}
                            style="text-decoration: {completed ? 'line-through' : 'none'}"
                        >
                            {name} - <strong>{category}</strong> - <em>{date}</em> - Status: {status}
                        </span>
                    {/if}

                    <button on:click={() => deleteTodo(id)} class="bg-red-500 text-white p-2 rounded mt-3">Delete</button>
                </li>
            {/each}
        </ul>
    </div>

    <!-- Footer Section -->
    <div class="text-center m-5">
        <footer>
            <p>{remainingTodos} todos left</p>
            <button on:click={clearCompleted} class="bg-blue-500 text-white p-2 rounded">Clear completed todos</button>
        </footer>
    </div>
</main>
