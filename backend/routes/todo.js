const router = require('express').Router()

const ToDoController = require("../controllers/ToDoController");
const verifyJWT = require('../middlewares/VerifyJWT');

router.get('/alltodos', ToDoController.getAllToDos)
router.post('/add', verifyJWT ,ToDoController.addToDo);
router.patch('/:id', verifyJWT, ToDoController.updateToDo)
router.delete('/:id', verifyJWT, ToDoController.deleteToDo)

module.exports = router;
    