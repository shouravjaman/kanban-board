const tasks = [];
const input = document.querySelector(".add-task input");
const addBtn = document.querySelector(".add");
const todoList = document.querySelector(".todo .task-list");
const doingList = document.querySelector(".doing .task-list");
const doneList = document.querySelector(".done .task-list");
const BASE_API_URL="https://kanban-board-2bn5.onrender.com";
async function loadTasks() {
    const response = await fetch(`${BASE_API_URL}/api/tasks`)
    if (!response.ok) {
        console.error("Failed to load tasks:", response.status);
        return;
    }
    const data = await response.json();
    tasks.splice(0, tasks.length, ...data.tasks);
    renderTasks();
};
loadTasks();

addBtn.addEventListener("click", async () => {
    if (input.value.trim() === "") {
        return;
    }

    const response = await fetch(`${BASE_API_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: input.value
        })
    });

    const data = await response.json();
    console.log("Server response:", data);
    if (!response.ok) {
        alert("Failed to create task");
        return;
    }

    tasks.push(data);
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
        <img src="./assets/rightarrow.svg" alt="move task">
        </button>
        <button class="edit-btn card-btn" aria-label="edit task"><img src="./assets/edit.svg" alt=""></button>
        <button class="delete-btn card-btn" aria-label="delete task"><img src="./assets/delete.svg" alt=""></button>
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
        moveBtn.addEventListener("click", async () => {
            let tobeStatus = "";
            if (task.status === "todo") {
                tobeStatus = "doing";
            } else if (task.status === "doing") {
                tobeStatus = "done";
            }
            const response = await fetch(`${BASE_API_URL}/api/tasks/${task._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: tobeStatus })
            });
            if (!response.ok) {
                alert("Failed to update status");
                return;
            }
            const updatedTask = await response.json();
            task.status = updatedTask.status;
            renderTasks();
        });
        const editBtn = taskCard.querySelector(".edit-btn")
        const deleteBtn = taskCard.querySelector(".delete-btn")
        editBtn.addEventListener("click", () => {
            taskCard.innerHTML = `<input class="task-update" type="text" placeholder="Edit Task..." value="${task.title}">
            <button class="tick-btn"><img src= "./assets/tick.svg" alt=""></button>`
            const editInput = taskCard.querySelector(".task-update");
            const tickBtn = taskCard.querySelector(".tick-btn");
            tickBtn.addEventListener("click", async () => {
                const response = await fetch(`${BASE_API_URL}/api/tasks/${task._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title: editInput.value })
                })
                if (!response.ok) {
                    alert("Failed to update status");
                    return;
                }
                const updatedTask = await response.json();
                task.title = updatedTask.title;
                renderTasks();
            });
        });
        deleteBtn.addEventListener("click", async () => {
            const response = await fetch(`${BASE_API_URL}/api/tasks/${task._id}`, {
                method: "DELETE",
            })
            if (!response.ok) {
                alert("Failed to delete task");
                return;
            }
            const taskIndex = tasks.findIndex(t => t._id === task._id);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
            }
            renderTasks();
        });
    });
    todoTitle.textContent = `To Do (${todoCount})`;
    doingTitle.textContent = `Doing (${doingCount})`;
    doneTitle.textContent = `Done (${doneCount})`;
}

renderTasks();