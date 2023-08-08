const ToDoService = require("../services/ToDoServices");
const UserService = require("../services/UserServices")
const getToken = require("../auth/get-token");

module.exports = class ToDoController {
  // GET
  // get all todos from db

  static async getAllToDos(req, res) {
    const alltodos = await ToDoService.getAllToDos();

    res.status(200).json(alltodos);
  }
  
  static async getAllUserToDos(req, res) {
    // get user token
    const token = getToken(req);
    // send the token to get the user
    const user = await UserService.getUserByToken(token);

    try {
      const allUserToDos = await ToDoService.getAllUserToDos(user);

      if (!allUserToDos) {
        res.status(404).json({ message: "There is no to-dos for this user" });
        return;
      }

      res.status(200).json({ message: allUserToDos, token: token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  }

  // GET
  // get one to do from db by the parameter id
  static async getToDoById(req, res) {
    const id = req.params.id;

    try {
      const todo = await ToDoService.getToDoById(id);

      if (!todo) {
        res.status(404).json({ message: "There is no to-do with this id" });
        return;
      }

      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // POST
  // add a to do in db
  static async addToDo(req, res) {
    const { todotitle, todocategory } = req.body;
    const active = true;

    if (!todotitle) {
      res.status(400).json({ message: "To do title is mandatory" });
      return;
    }
    if (!todocategory) {
      res.status(400).json({ message: "To do category is mandatory" });
      return;
    }


    // get user token
    const token = getToken(req);
    // send the token to get the user
    const user = await UserService.getUserByToken(token);


    try {
      const newToDo = await ToDoService.addToDo({
        todotitle,
        todocategory,
        active,
        user: {
          _id: user._id,
          name: user.name,
          image: user.image,
        },
      });

      res.status(201).json({
        message: `To-do created! To-do name: ${newToDo.todotitle}`,
        todo: newToDo,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // PATCH
  // updating the to do if its active(true) or not(false)
  static async updateToDo(req, res) {
    const id = req.params.id;

    const active = req.body.active;

    const todo = await ToDoService.getToDoById(id);

    // get user token
    const token = getToken(req);
    // send the token to get the user
    const user = await UserService.getUserByToken(token);


    if (todo.user._id.toString() !== user._id.toString()) {
      res.status(400).json({ message: "id podre" });
      return;
    }

    try {
      const updatedToDo = await ToDoService.updateToDo(id);

      if (!updatedToDo) {
        res.status(404).json({ message: "There is no to-do with this id" });
        return;
      }

      res.status(200).json({ message: updatedToDo });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteToDo(req, res) {
    const id = req.params.id;

    const todo = await ToDoService.getToDoById(id);

    const token = getToken(req);

    const user = await UserService.getUserByToken(token);

    try {
      if (todo.user._id.toString() !== user._id.toString()) {
        res
          .status(400)
          .json({
            message: "The todo.user.id is not the same as the user.id(token)",
          });
        return;
      }

      const deletedToDo = await ToDoService.deleteToDo(id);

      return res.status(200).json({ message: "To-do removed", deletedToDo });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
