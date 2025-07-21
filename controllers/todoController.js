const Todo = require('../models/todoModel');

exports.addTodo = async (req, res) => {
  try {
    const { task, status, userId } = req.body;

    const newTodo = new Todo({ task, status, userId });
    await newTodo.save();

    res.status(201).json({ message: 'Todo added successfully', todo: newTodo });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add todo', error: err.message });
  }
};

// ✅ Get all todos by userId
exports.getTodos = async (req, res) => {
  try {
    const { userId } = req.params;

    const todos = await Todo.find({ userId });

    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos', error: err.message });
  }
};
exports.updateTodo = async (req, res) => {
  try {
    const { task, status } = req.body;
    const { id } = req.params;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update todo', error: err.message });
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete todo', error: err.message });
  }
};
