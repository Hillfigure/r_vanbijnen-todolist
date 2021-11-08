const mainContent = document.querySelector(".main-content");
const submitButton = document.querySelector(".submit-button");
const inputField = document.getElementById("new-todo")

// Initialize page

const init = () => {
    submitButton.addEventListener("click", async () => {
        if(inputField.value){
            const input = {todo: inputField.value, done: false};
            inputField.value = "";
            const task = await postItem(input);
            createListItem(task.todo, task._id, task.done)
        } else {
            alert("cannot create an empty task")
        }
    })
    
    inputField.addEventListener("keyup", async (e) => {
        if (inputField.value && e.keyCode == 13) {
            const input = {todo: inputField.value, done: false};
            inputField.value = "";
            const task = await postItem(input);
            createListItem(task.todo, task._id, task.done)
        }
    })
    
    const getAllTasks = async function() {
        const allTasks = await getAllItems();
        for (let task of allTasks) {
            createListItem(task.todo, task._id, task.done)
        }
    }
    getAllTasks();
}

// List-item contains: Checkbox | Todo Field | Delete-Edit btns

const createListItem = (todo, id, done) => {
    const listItem = mainContent.appendChild(document.createElement("li"));
    listItem.classList.add("list-item");

    createCheckBox(listItem, id, done);
    createTodoField(listItem, todo, done)
    createDeleteButton(listItem, id);
    createEditButton(listItem, id);
}

const createCheckBox = (listItem, id, done) => {
    const checkBox = listItem.appendChild(document.createElement("input"));
    checkBox.classList.add("check-box");
    checkBox.type = "checkbox";
    if (done === true) {
        checkBox.checked = "checked";
    }
    styleChecked(checkBox, id)
}

// Strike text/Change color if checkbox is checked/unchecked
const styleChecked = (checkBox, id) => {
    checkBox.addEventListener("click", () => {
        const taskValue = checkBox.nextSibling;
        const parentBox = taskValue.parentElement; 
        if(checkBox.checked){
            taskValue.classList.add("strike")
            parentBox.classList.add("job-done")
            const updateValues = { done: true };
            putItem(updateValues, id)
        } else if (!checkBox.checked){
            taskValue.classList.remove("strike")
            parentBox.classList.remove("job-done")
            const updateValues = { done: false };
            putItem(updateValues, id)
        }
    })
}

// Creates div to display todo descr. + adds edit handlers

const createTodoField = (listItem, todo, done) => {
    const todoField = listItem.appendChild(document.createElement("div"));
    todoField.classList.add("todo-field");
    todoField.innerHTML = todo;
    if(done === true) {
        todoField.classList.add("strike");
        listItem.classList.add("job-done")
    }
    todoField.addEventListener("click", () => {
        listItem.querySelector(".delete-button").classList.add("hide");
        listItem.querySelector(".edit-button").classList.remove("hide");
        const editField = listItem.appendChild(document.createElement("input"));
        editField.classList.add("edit-field");
        listItem.insertBefore(editField, listItem.children[1])
        editField.value = todoField.innerHTML;
        editField.focus();
        todoField.classList.add("hide");
    })
}

// Create delete button, deal with click handler

const createDeleteButton = (listItem, id) => {
    let deleteButton = listItem.appendChild(document.createElement("em"));
    deleteButton.classList.add("delete-button");
    deleteButton.classList.add("fas", "fa-trash")
    deleteButton.addEventListener("click", () => {
        listItem.remove(this);
        deleteItem(id)
    })
}

// Create edit button, deal with click and keydown handlers

const createEditButton = (listItem, id) => {
    let editButton = listItem.appendChild(document.createElement("em"));
    editButton.classList.add("edit-button", "hide");
    editButton.classList.add("fas", "fa-share-square")
        editButton.addEventListener("click", () => {
        const editField = editButton.parentElement.querySelector(".edit-field"); 
        const todoField = editField.parentElement.querySelector(".todo-field");
        const deleteButton = editField.parentElement.querySelector(".delete-button")

        const editValue = editField.value;
        const editValues = { todo: editValue }
        todoField.innerHTML = editValue;
        
        todoField.classList.remove("hide")
        editField.classList.add("hide");
        editButton.classList.add("hide");
        deleteButton.classList.remove("hide")
        putItem(editValues, id)
    })
        listItem.addEventListener("keydown", (e) => {
        if(e.keyCode == 13) {
            const editField = editButton.parentElement.querySelector(".edit-field"); 
            const todoField = editField.parentElement.querySelector(".todo-field");
            const deleteButton = editField.parentElement.querySelector(".delete-button")

            const editValue = editField.value;
            const editValues = { todo: editValue }
            todoField.innerHTML = editValue;
            
            todoField.classList.remove("hide")
            editField.classList.add("hide");
            editButton.classList.add("hide");
            deleteButton.classList.remove("hide")
            putItem(editValues, id)
        }
    })

}

init();

