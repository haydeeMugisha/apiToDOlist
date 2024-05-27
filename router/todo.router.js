import express from "express";
import { Todo } from "../model/todo.model.js";
import { verifyToken } from "../utility/auth.utility.js";
import { getTodos, createTodo, updateTodo, deleteTodo, postponeTodo } from "../service/todo.service.js";

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await getTodos(req.userId);
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const newTask = await createTodo(req.body, req.userId);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const task = await updateTodo(req.params.id, req.body, req.userId);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await deleteTodo(req.params.id, req.userId);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

router.post('/postpone/:id', verifyToken, async (req, res) => {
  try {
    const task = await postponeTodo(req.params.id, req.userId);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error postponing task', error: error.message });
  }
});

export { router };
