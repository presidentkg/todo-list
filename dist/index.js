"use strict";
const todoContainer = document.getElementById('todo-container');
const todoText = document.getElementById('todo-text');
const todoDate = document.getElementById('todo-date');
const todoTime = document.getElementById('todo-time');
const todoList = document.getElementById('todo-list');
const emptyText = document.getElementById('empty-text');
const emptyDate = document.getElementById('empty-date');
const todoForm = document.getElementById('todo-form');
const clearTodosButton = document.getElementById('clear-todos-button');
let todos = [];
function checkTodos() {
    if (todos.length === 0)
        clearTodosButton.className = 'inactive-button';
    else
        clearTodosButton.className = 'delete-button';
}
renderTodos();
function renderTodos() {
    sortTodos();
    checkTodos();
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        const todoContent = document.createElement('span');
        todoContent.textContent = todo.date + ' ' + todo.time + ' ' + todo.text;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('click', () => {
            todo.completed = !todo.completed;
            renderTodos();
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Ta bort';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });
        li.appendChild(todoContent);
        li.appendChild(checkbox);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // stoppar att sidan laddas om
    if (todoText.value.trim() === '') {
        emptyText.textContent = 'Vänligen skriv något i input-fältet.';
        return;
    }
    if (todoDate.value.trim() === '') {
        emptyDate.textContent = 'Vänligen välj ett datum för uppgiften.'; // Specifikt felmeddelande för datum
        return;
    }
    let maxID = 0;
    if (todos.length > 0) {
        //maxID = Math.max(...todos.map(todo => todo.id)) + 1
        maxID = todos.length;
    }
    else {
        maxID = 1;
    }
    const newTodo = {
        id: maxID,
        text: todoText.value.trim(),
        date: todoDate.value,
        time: todoTime.value,
        completed: false
    };
    todos.push(newTodo);
    renderTodos();
    todoText.value = '';
    todoDate.value = '';
    todoTime.value = '';
});
function sortTodos() {
    todos.sort((a, b) => {
        if (a.completed && !b.completed) {
            return 1;
        }
        else if (!a.completed && b.completed) {
            return -1;
        }
        const timeA = a.time || '00:00';
        const timeB = b.time || '00:00';
        const dateA = new Date(a.date + 'T' + timeA);
        const dateB = new Date(b.date + 'T' + timeB);
        return dateA.getTime() - dateB.getTime();
    });
}
clearTodosButton.addEventListener('click', () => {
    todos = [];
    renderTodos();
});
//Rensa felmeddelandet så fort användaren börjar mata in
todoText.addEventListener('input', () => {
    emptyText.textContent = '';
});
todoDate.addEventListener('input', () => {
    emptyDate.textContent = '';
});
//# sourceMappingURL=index.js.map