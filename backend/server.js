import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const tasks = [];
app.get("/api/tasks", (req, res) => {
    res.status(200).json({
        "success": true,
        "tasks": tasks
    });
});

app.post("/api/tasks", (req, res) => {
    if (typeof req.body.title !== "string" || !req.body.title.trim()) {
        return res.status(400).send("Invalid Input");
    } else {
        const newTask = {
            id: Date.now(),
            title: req.body.title.trim(),
            status: "todo"
        }
        tasks.push(newTask);
        return res.status(201).json(newTask);
    }
});

app.patch("/api/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ message: "Task not found!" });
    }
    const { title, status } = req.body;
    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).send("Invalid title");
        }
        task.title = title.trim();
    }
    if (status !== undefined) {
        if (!["todo", "doing", "done"].includes(status)) {
            return res.status(400).send("Invalid status");
        }
        task.status = status;
    }
    return res.status(200).json(task);

})

app.delete("/api/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found!" });
    }
    tasks.splice(taskIndex, 1);
    return res.status(200).json({ message: "Task deleted successfully!" });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})