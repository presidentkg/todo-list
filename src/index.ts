import { todos as testTodos } from './services/variables.js';
const todoContainer = document.getElementById('todo-container') as HTMLElement
const todoText = document.getElementById('todo-text') as HTMLInputElement
const todoDate = document.getElementById('todo-date') as HTMLInputElement
const todoTime = document.getElementById('todo-time') as HTMLInputElement
const emptyText = document.getElementById('empty-text') as HTMLElement
const emptyDate = document.getElementById('empty-date') as HTMLElement
const todoForm = document.getElementById('todo-form') as HTMLFormElement
const todoCards = document.getElementById('todo-cards') as HTMLElement
const clearTodosButton = document.getElementById('clear-todos-button') as HTMLButtonElement

export interface Todo {
  id: number
  text: string
  date: string
  time?: string
  completed: boolean
}

//Avkommentera när testdata inte längre behövs
//let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')

//Ta bort när testdata inte längre behövs
let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || JSON.stringify(testTodos));
//


function checkTodos(): void {
    if(todos.length === 0)
        clearTodosButton.className = 'inactive-button';
    else
        clearTodosButton.className = 'delete-button';
}


renderTodos()

function renderTodos(): void{
    sortTodos()
    checkTodos()
    todoCards.innerHTML = ''
    todos.forEach(todo => {
        const article = document.createElement('article')
        article.className = "todo-item"
        
        /* const todoId = document.createElement('p')
        todoId.className = "todo-id"
        todoId.textContent = `${todo.id}`
        article.appendChild(todoId) */

        const cardHeadBody = document.createElement('div')
        cardHeadBody.className = "card-head-body"
        const cardHeader = document.createElement('div')
        const todoDate = document.createElement('p')        
        cardHeader.className = "card-header"
        todoDate.className = "todo-date"
        todoDate.textContent = todo.date
        cardHeader.appendChild(todoDate)

        if (todo.time) {
            const todoTime = document.createElement('p')
            todoTime.className = "todo-time"
            todoTime.textContent = todo.time
            cardHeader.appendChild(todoTime)
        }

        const cardBody = document.createElement('div')
        cardBody.className = "card-body"
        const todoText = document.createElement('p')
        todoText.className = "todo-text"
        todoText.textContent = todo.text
        cardBody.appendChild(todoText)

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed
        checkbox.addEventListener('click', () => {
            todo.completed = !todo.completed
            renderTodos()
        })
        cardBody.appendChild(checkbox)

        const cardFooter = document.createElement('div')
        cardFooter.className = "card-footer"
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'X'; // Eller 'Ta bort'
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });
        cardFooter.appendChild(deleteButton)

        cardHeadBody.appendChild(cardHeader)
        cardHeadBody.appendChild(cardBody)
        article.appendChild(cardHeadBody)
        article.appendChild(cardFooter)
        todoCards.appendChild(article)
        /* const tr = document.createElement('tr')
        tr.className = todo.completed ? 'completed' : ''

        const tdDate = document.createElement('td')
        tdDate.textContent = todo.date
        tr.appendChild(tdDate)

        const tdTime = document.createElement('td')
        tdTime.textContent = todo.time || ''
        tr.appendChild(tdTime)

        const tdText = document.createElement('td')
        const tdTextContent = document.createElement('span');
        tdTextContent.textContent = todo.text
        tdText.appendChild(tdTextContent)
        tr.appendChild(tdText)

        const tdCheckbox = document.createElement('td')
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed
        checkbox.addEventListener('click', () => {
            todo.completed = !todo.completed
            renderTodos()
        })
        tdCheckbox.appendChild(checkbox)
        tr.appendChild(tdCheckbox)

        const tdDelete = document.createElement('td')
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'X'; // Eller 'Ta bort'
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });
        tdDelete.appendChild(deleteButton)
        tr.appendChild(tdDelete)
        todoListBody.appendChild(tr) */

    })
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // stoppar att sidan laddas om

    if (todoText.value.trim() === '') {
        emptyText.textContent = 'Vänligen skriv något i input-fältet.'
        return
    }

    if (todoDate.value.trim() === '') {
        emptyDate.textContent = 'Vänligen välj ett datum för uppgiften.'; // Specifikt felmeddelande för datum
        return;
    
    }

    let maxID = 0
    if (todos.length > 0) {
        maxID = Math.max(...todos.map(todo => todo.id)) + 1
        //maxID = todos.length
    }
    else {
        maxID = 1
    }

    const newTodo: Todo = {
        id: maxID,
        text: todoText.value.trim(),
        date: todoDate.value,
        time: todoTime.value,
        completed: false
    }
    todos.push(newTodo)
    renderTodos()
    todoText.value = ''
    todoDate.value = '';
    todoTime.value = '';
})

function sortTodos(): void {
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
    todos = []
    renderTodos()
})

//Rensa felmeddelandet så fort användaren börjar mata in
todoText.addEventListener('input', () => {
    emptyText.textContent = '';
});

todoDate.addEventListener('input', () => {
    emptyDate.textContent = '';
});