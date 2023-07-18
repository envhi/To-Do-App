const router = require('express').Router()

const ToDoController = require("../controllers/ToDoController");
const verifyJWT = require('../middlewares/VerifyJWT');

router.get('/alltodos', verifyJWT,ToDoController.getAllUserToDos)
router.get('/:id', verifyJWT, ToDoController.getToDoById)
router.post('/add', verifyJWT ,ToDoController.addToDo);
router.patch('/:id', verifyJWT, ToDoController.updateToDo)
router.delete('/:id', verifyJWT, ToDoController.deleteToDo)

module.exports = router;
