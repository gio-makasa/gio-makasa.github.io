const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');
const arwbtn = document.getElementById('arrow').firstChild;
const todosls = JSON.parse(localStorage.getItem("todosls"));

if(todosls){
    todosls.forEach(todols => {
        addTodo(todols);
    });
}

arwbtn.addEventListener("click", () => {
    todos.classList.toggle("hide");
    arwbtn.classList.toggle("fa-caret-down");
    arwbtn.classList.toggle("fa-caret-up");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todols){
    let todotext = input.value;

    if(todols){
        todotext = todols.Text;
    }
    
    if(todotext){
        const todo = document.createElement("li");
        if(todols && todols.completed){
            todo.classList.add("completed");
        }
        const delbtn = document.createElement("button");
        const del = document.createElement("i");
        del.classList.add("fa-solid");
        del.classList.add("fa-xmark");

        delbtn.appendChild(del);

        todo.innerText = todotext;
        todos.appendChild(todo);
        todo.appendChild(delbtn);

        input.value = '';

        todo.addEventListener("click", () => {
            todo.classList.toggle("completed");

            updateLS()
        });

        delbtn.addEventListener("click", () => {
            todos.removeChild(todo);

            updateLS()
        });

        updateLS()
    }
}

function updateLS(){
    const todosel = document.querySelectorAll("li");

    const todols = [];

    todosel.forEach((todoel) => {
        todols.push({
            Text: todoel.innerText,
            completed: todoel.classList.contains("completed"),
        });
    });

    localStorage.setItem("todosls", JSON.stringify(todols));
}