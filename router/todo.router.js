import express from "express";
import { Todo } from "../model/index.js";
import { verifyToken } from "../utility/auth.utility.js";

const router = express.Router();

// Retrieve all tasks
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Todo.findAll();
        res.send(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
});

// Add a new task
router.post('/', verifyToken, async (req, res) => {
    try {
        const { description, motivationalMessage } = req.body;
        const newTask = await Todo.create({ description, motivationalMessage, status: 'active' });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error adding task', error: error.message });
    }
});

// Update a task
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { description, motivationalMessage, status } = req.body;
        const task = await Todo.findByPk(id);
        if (task) {
            task.description = description || task.description;
            task.motivationalMessage = motivationalMessage || task.motivationalMessage;
            task.status = status || task.status;
            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

// Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todo.destroy({ where: { id } });
        if (result) {
            res.json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

export { router };
