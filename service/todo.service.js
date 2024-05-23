import { Todo } from "../model/todo.model.js";

const getTodos = async (userId) => {
  return await Todo.findAll({ where: { userId }, order: [['status', 'ASC'], ['createdAt', 'ASC']] });
};

const createTodo = async (data, userId) => {
  const { description, motivationalMessage } = data;
  const todo = new Todo({
    description,
    motivationalMessage,
    userId,
  });
  return await todo.save();
};

const updateTodo = async (id, data, userId) => {
  const todo = await Todo.findOne({ where: { id, userId } });
  if (!todo) {
    throw new Error('Todo not found');
  }
  todo.description = data.description || todo.description;
  todo.motivationalMessage = data.motivationalMessage || todo.motivationalMessage;
  todo.status = data.status || todo.status;
  return await todo.save();
};

const deleteTodo = async (id, userId) => {
  const todo = await Todo.findOne({ where: { id, userId } });
  if (!todo) {
    throw new Error('Todo not found');
  }
  return await todo.destroy();
};

const postponeTodo = async (id, userId) => {
  const todo = await Todo.findOne({ where: { id, userId } });
  if (!todo) {
    throw new Error('Todo not found');
  }
  todo.status = 'postponed';
  return await todo.save();
};

export { getTodos, createTodo, updateTodo, deleteTodo, postponeTodo };
