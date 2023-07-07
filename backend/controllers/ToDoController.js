const ToDoService = require("../services/ToDoServices");

// check id method import
const { ObjectId } = require("mongodb");

// models import
const ToDo = require("../models/ToDo");

module.exports = class ToDoController {
  // GET
  // get all todos from db
  static async getAllToDos(req, res) {
    const alltodos = await ToDoService.getAllToDos();

    res.status(200).json(alltodos);
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

    try {
      const newToDo = await ToDoService.addToDo({
        todotitle,
        todocategory,
        active,
      });

      res.status(201).json({
        message: `To-do created! To-do name: ${newToDo.todotitle}`,
        todo: newToDo,
      });
    } catch (error) {
      res.status(500).json({ message: "xereca" });
    }
  }

  // PATCH
  // updating the to do if its active(true) or not(false)
  static async updateToDo(req, res) {
    const id = req.params.id;

    const active = req.body.active;

    try {
      const updatedToDo = await ToDoService.updateToDo(id, active);

      if (!updatedToDo) {
        res.status(404).json({ message: "There is no to-do with this id" });
        return;
      }

      res.status(200).json({ message: updatedToDo });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // delete to do from db by the parameter id
  static async deleteToDo(req, res) {
    const id = req.params.id;
    try {
      await ToDoService.deleteToDo(id);

      res.status(204);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
