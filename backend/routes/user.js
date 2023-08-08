const router = require("express").Router();

const UserController = require("../controllers/UserController");


// mid
const verifyJWT = require('../middlewares/VerifyJWT')

// router.get("/:id", UserController.findUserById)
router.get("/allusertodos", verifyJWT, UserController.getAllUserToDos)
router.post("/add", UserController.addNewUser);
router.post("/login", UserController.logIn);
router.patch('/edit', verifyJWT, UserController.editUserEmail)
router.delete('/delete', verifyJWT, UserController.deleteUser)


module.exports = router;
