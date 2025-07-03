document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todoList");
    const completedList = document.getElementById("completedList");
    const newTitle = document.getElementById("newTitle");
    const newDescription = document.getElementById("newDescription");
    const addTodoBtn = document.getElementById("addTodo");
    const showTodosBtn = document.getElementById("showTodos");
    const showCompletedBtn = document.getElementById("showCompleted");

    let editId = null;

    // Base URL for Backend API
    const BASE_URL = "http://localhost:8080/api/todos";

    // Fetch and Render Todos
    async function fetchTodos() {
        const response = await fetch(BASE_URL);
        const todos = await response.json();
        renderTodos(todos);
    }

    async function fetchCompletedTodos() {
        const response = await fetch(`${BASE_URL}/completed`);
        const completedTodos = await response.json();
        renderCompletedTodos(completedTodos);
    }

    function renderTodos(todos) {
        todoList.innerHTML = "";
        todos.forEach(todo => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-list-item");
            todoItem.innerHTML = `
                <div>
                    <h3>${todo.title}</h3>
                    <p>${todo.description}</p>
                </div>
                <div>
                    <span class="icon" onclick="deleteTodo(${todo.id})">🗑️</span>
                    <span class="check-icon" onclick="completeTodo(${todo.id})">✔️</span>
                    <span class="icon" onclick="editTodo(${todo.id}, '${todo.title}', '${todo.description}')">✏️</span>
                </div>
            `;
            todoList.appendChild(todoItem);
        });
    }

    function renderCompletedTodos(todos) {
        completedList.innerHTML = "";
        todos.forEach(todo => {
            const completedItem = document.createElement("div");
            completedItem.classList.add("todo-list-item");
            completedItem.innerHTML = `
                <div>
                    <h3>${todo.title}</h3>
                    <p>${todo.description}</p>
                </div>
                <div>
                    <span class="icon" onclick="deleteTodo(${todo.id})">🗑️</span>
                </div>
            `;
            completedList.appendChild(completedItem);
        });
    }

    // Add New Todo
    addTodoBtn.addEventListener("click", async function () {
        const title = newTitle.value.trim();
        const description = newDescription.value.trim();

        if (!title || !description) {
            alert("Please enter title and description.");
            return;
        }

        const todoData = { title, description, completed: false };

        if (editId) {
            // Update existing todo
            await fetch(`${BASE_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todoData)
            });
            editId = null;
        } else {
            // Create new todo
            await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todoData)
            });
        }

        newTitle.value = "";
        newDescription.value = "";
        fetchTodos();
    });

    // Complete Todo
    window.completeTodo = async function (id) {
        await fetch(`${BASE_URL}/${id}/complete`, { method: "PUT" });
        fetchTodos();
        fetchCompletedTodos();
    };

    // Delete Todo
    window.deleteTodo = async function (id) {
        await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        fetchTodos();
        fetchCompletedTodos();
    };

    // Edit Todo
    window.editTodo = function (id, title, description) {
        newTitle.value = title;
        newDescription.value = description;
        editId = id;
    };

    // Toggle Views
    showTodosBtn.addEventListener("click", function () {
        todoList.style.display = "block";
        completedList.style.display = "none";
        showTodosBtn.classList.add("active");
        showCompletedBtn.classList.remove("active");
    });

    showCompletedBtn.addEventListener("click", function () {
        todoList.style.display = "none";
        completedList.style.display = "block";
        showCompletedBtn.classList.add("active");
        showTodosBtn.classList.remove("active");
    });

    // Initial Fetch
    fetchTodos();
    fetchCompletedTodos();
});
