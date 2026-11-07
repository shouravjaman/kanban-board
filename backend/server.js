import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Task } from "./models/task.js";
import dotenv from "dotenv";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const tasks = [];
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            "success": true,
            "tasks": tasks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks"
        })
    }
});

app.post("/api/tasks", async (req, res) => {
    if (typeof req.body.title !== "string" || !req.body.title.trim()) {
        return res.status(400).send("Invalid Input");
    }
    try {
        const newTask = await Task.create({
            title: req.body.title.trim()
        });
        return res.status(200).json(newTask)
    } catch (error) {
        return res.status(500).json({ message: "failed to create task" });
    }

});

app.patch("/api/tasks/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: "Task not found!" });
    }
    const { title, status } = req.body;
    const updated = {};
    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).send("Invalid title");
        }
        updated.title = title.trim()
    }
    if (status !== undefined) {
        if (!["todo", "doing", "done"].includes(status)) {
            return res.status(400).send("Invalid status");
        }
        updated.status = status;
    }
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            updated,
            {
                new: true, runValidators: true
            }
        )
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update task"
        });
    }
})

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }
        return res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "failed to delete task!" });
    }
})

const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Atlas connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

startServer();