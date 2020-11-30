const todos = [
    'Пройти туториал по Реакту',
    'Сделать фронт для своего проекта',
    'Решить задачу на Codewars',
];

const todosListElement = document.querySelector('.todos__list');
const todosFormElement = document.querySelector('.todos__form');
const todosInputElement = todosFormElement.querySelector('.todos__input');
const todoTemplateElement = document.querySelector('.todo-template');
const todosFormSubmitButton = todosFormElement.querySelector('.todos__submit-bth');

let editedTodo = null;

function addTodo(text) {
    const todo = todoTemplateElement.content.cloneNode(true);

    todo.querySelector('.todo__text').textContent = text;

    addTodoListeners(todo);

    todosListElement.prepend(todo);
}

function addTodoListeners(todo) {
    todo.querySelector('.todo__bth_type_edit').addEventListener('click', editTodo);
    todo.querySelector('.todo__bth_type_duplicate').addEventListener('click', duplicateTodo);
    todo.querySelector('.todo__bth_type_delete').addEventListener('click', deleteTodo);
}

function editTodo(e) {
    const todo = e.target.closest('.todo');

    setTodotoForm(todo);
}

function setTodotoForm(todo) {
    editedTodo = todo;

    const text = todo.querySelector('.todo__text').textContent;

    todosInputElement.value = text;
    todosFormSubmitButton.textContent = 'Сохранить';
}

function handleTodoFormSubmit(e) {
    e.preventDefault();
    const text = todosInputElement.value;
    todosInputElement.value = '';

    if (editedTodo) {
        editedTodo.querySelector('.todo__text').textContent = text;
        todosFormSubmitButton.textContent = 'Добавить';
        editedTodo = null;
    } else {
        addTodo(text);
    }
}

function duplicateTodo(e) {
    const todo = e.target.closest('.todo');

    const newTodo = todo.cloneNode(true);
    addTodoListeners(newTodo);

    todo.after(newTodo);
}

function deleteTodo(e) {
    const todo = e.target.closest('.todo');

    todo.remove();
}

todos.forEach(text => {
    addTodo(text);
});

todosFormElement.addEventListener('submit', handleTodoFormSubmit);