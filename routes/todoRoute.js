const express = require('express');
const { addTodo, getTodos , updateTodo, deleteTodo} = require('../controllers/todoController');


const router = express.Router();

// Add new todo
router.post('/', addTodo);

// Get all todos for a user
router.get('/:userId', getTodos);

router.put('/:id', updateTodo);

router.delete('/:todoId', deleteTodo);



module.exports = router;
