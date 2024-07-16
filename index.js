const inputTodo = document.getElementById('todo');
const addBtn = document.getElementById('addBtn');
const showTodo = document.getElementById('list');


let todoList = [];
let editId = null;

let todoObjStr = localStorage.getItem('todo');
if (todoObjStr != null) {
    todoList = JSON.parse(todoObjStr);
}

inputTodo.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
})


displayTodo();

function addTodo() {
    const todo = inputTodo.value;
    if (todo == '') return;
    if (editId != null) {
        todoList.splice(editId, 1, { "todo": todo });
        editId = null;
        addBtn.textContent = `Add Todo`;
    } else {
        todoList.unshift({ "todo": todo })

    }
    saveTodo(todoList)
    inputTodo.value = '';
}
addBtn.addEventListener('click', () => {
    addTodo();
})


function saveTodo(todoList) {

    let todoStr = JSON.stringify(todoList);
    localStorage.setItem('todo', todoStr);
    displayTodo();

}

function displayTodo() {
    let todoListItem = '';
    todoList.forEach((todo, i) => {

        todoListItem += ` <div class="listItem">
                <ul>
                    <li>${todo.todo}</li>
                </ul>
                <div class="btns">
                    <button id="editBtn" onclick="updateTodo(${i})">Edit</button>
                    <button id="deleteBtn" onclick = "deleteTodo(${i})">Delete</button>
                </div>
            </div>`
    });
    showTodo.innerHTML = todoListItem;
}

function updateTodo(id) {
    editId = id;
    inputTodo.value = todoList[id].todo;
    addBtn.innerHTML = `Update`
}

function deleteTodo(id) {
    todoList.splice(id, 1);
    saveTodo(todoList);
}