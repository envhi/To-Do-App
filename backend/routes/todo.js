const router = require('express').Router()

const ToDoController = require("../controllers/ToDoController")

router.get('/alltodos', ToDoController.getAllToDos)
router.get('/:id', ToDoController.getToDoById)
router.post('/add', ToDoController.addToDo);
router.patch('/:id', ToDoController.updateToDo)
router.delete('/:id', ToDoController.deleteToDo)

module.exports = router;
