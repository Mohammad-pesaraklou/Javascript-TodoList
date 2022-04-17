let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterTodo = document.querySelector(".filter-todo");


todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteComplete)
filterTodo.addEventListener("click", filteredTodo)
document.addEventListener("DOMContentLoaded", getTodo)



function addTodo(event){
    event.preventDefault()
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerHTML = todoInput.value;
    todoDiv.appendChild(newTodo);
   
    saveLocal(todoInput.value);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = `<i class="fas fa-check"><i>`
    todoDiv.appendChild(completedButton);


    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"><i>`
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    todoList.appendChild(todoDiv);
}


function deleteComplete(event){
let clicked = event.target;
if(clicked.classList[0] === "complete-btn"){
    let parent = clicked.parentElement
    parent.classList.toggle("completed")
}else if(clicked.classList[0] === "trash-btn"){
    let parent = clicked.parentElement
    removeLocal(parent)
    parent.remove();
}

}

function filteredTodo(event){
    let click = todoList.childNodes;
    click.forEach(todo =>{
        switch(event.target.value){
            case "all":
                todo.style.display = "flex"
        break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex"
                    }else{
                        todo.style.display = "none"
                    }
                    break;
                    case "uncompleted":
                        if(todo.classList.contains("completed")){
                            todo.style.display = "none"
                        }else{
                            todo.style.display = "flex"
                        }
                        break;
        }




    })
}

function saveLocal(todo) {
    let items;
    if (localStorage.getItem("items") === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"))
    }
    items.push(todo);
    localStorage.setItem("items", JSON.stringify(items))
}
function removeLocal(todo){
    let items;
    if (localStorage.getItem("items") === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"))
    }
    const todoIndex = todo.children[0].innerText;
    items.splice(items.indexOf(todoIndex), 1);
    localStorage.setItem("items", JSON.stringify(items))
}






function getTodo(){
    let items;
    if (localStorage.getItem("items") === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"))
    }
    items.forEach(i =>{

            let todoDiv = document.createElement("div");
            todoDiv.classList.add("todo")
        
        
             let todoItem = document.createElement("li");
             todoItem.classList.add("todo-item");
             todoItem.innerHTML = i;
             todoDiv.appendChild(todoItem)
        
             
             let completedButton = document.createElement("button");
             completedButton.innerHTML =  `<i class="fas fa-check"><i>`
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton)
        
            
        
            let trashButton = document.createElement("button");
                trashButton.innerHTML =  `<i class="fas fa-trash"><i>`
               trashButton.classList.add("trash-btn");
                todoDiv.appendChild(trashButton)
        
        
            todoList.appendChild(todoDiv)
        


    }) 


}
