let tasks = [];
const input = document.querySelector(".add-task input");
const addBtn = document.querySelector(".add");
const todoList = document.querySelector(".todo .task-list");
const doingList = document.querySelector(".doing .task-list");
const doneList = document.querySelector(".done .task-list");
addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") {
        return;
    }
    const task =
    {
        id: tasks.length + 1,
        title: input.value,
        status: "todo",
    }

    tasks.push(task);
    renderTasks();
    input.value = "";
});

function renderTasks() {
    todoList.innerHTML = "";
    doingList.innerHTML = "";
    doneList.innerHTML = "";
    const todoTitle = document.querySelector(".todo h2")
    const doingTitle = document.querySelector(".doing h2")
    const doneTitle = document.querySelector(".done h2")
    let todoCount = 0;
    let doingCount = 0;
    let doneCount = 0;
    tasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.addEventListener("click", () => {
            taskCard.classList.toggle("active");
        });
        taskCard.className = "task-card";
        taskCard.innerHTML = `
        <p class="task-title">${task.title}</p>
        <div class="task-actions">
        <button class="move-btn card-btn" aria-label="move task">
        <img src="rightarrow.svg" alt="move task">
        </button>
        <button class="edit-btn card-btn" aria-label="edit task"><img src="edit.svg" alt=""></button>
        <button class="delete-btn card-btn" aria-label="delete task"><img src="delete.svg" alt=""></button>
    </div>`
        if (task.status === "todo") {
            todoCount++;
            todoList.append(taskCard);
        }
        else if (task.status === "doing") {
            doingCount++;
            doingList.append(taskCard);
        }
        else if (task.status === "done") {
            doneCount++;
            doneList.append(taskCard);
        }
        const moveBtn = taskCard.querySelector(".move-btn");
        moveBtn.addEventListener("click", () => {
            if (task.status === "todo") {
                task.status = "doing";
            } else if (task.status === "doing") {
                task.status = "done";
            }
            renderTasks();
        });
        const editBtn = taskCard.querySelector(".edit-btn")
        const deleteBtn = taskCard.querySelector(".delete-btn")
        editBtn.addEventListener("click", () => {
            taskCard.innerHTML = `<input class="task-update" type="text" placeholder="Edit Task...">
            <button class="tick-btn"><img src= "tick.svg" alt=""></button>`
            const editInput = taskCard.querySelector(".task-update");
            const tickBtn = taskCard.querySelector(".tick-btn");
            tickBtn.addEventListener("click", () => {
                task.title = editInput.value;
                renderTasks();
            });
        });
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });
    });
    todoTitle.textContent = `To Do (${todoCount})`;
    doingTitle.textContent = `Doing (${doingCount})`;
    doneTitle.textContent = `Done (${doneCount})`;
}
renderTasks();