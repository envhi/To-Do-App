// check id method import
const { ObjectId } = require("mongodb");

// models import
const ToDo = require("../models/ToDo");

module.exports = class ToDoController {

  static async getAllToDos(req, res) {

    const alltodos = await ToDo.find()

    res.status(200).json(alltodos)

  }

  static async getToDoById(req, res) {
    const id = req.params.id;

    // check if the id parameter from the URL is valid
    if (!ObjectId.isValid(id)) {
      res.status(404).json({ message: "id is not a valid hex" });
      return;
    }

    // check if todo exists by id
    const todo = await ToDo.findOne({ _id: id });

    if (!todo) {
      res.status(404).json({ message: "there is no to-do with this id" });
    }

    res.status(200).json({ todo });
  }

  static async addToDo(req, res) {
    const { todotitle, todocategory } = req.body;
    const active = true;

    if (!todotitle) {
      res.status(422).json({ Message: "todo title is mandatory!" });
      return;
    }

    if (!todocategory) {
      res.status(422).json({ Message: "todo test key is mandatory!" });
      return;
    }

    // create a todo
    const todo = new ToDo({
      todotitle,
      todocategory,
      active,
    });
    try {
      const newToDo = await todo.save();

      res.status(201).json({
        message: `to-do created! to-do name: ${todo.todotitle}`,
        newToDo,
      });
    } catch (err) {
      res.status(500).json({ message: error });
    }
  }

  static async updateToDo(req, res) {
    const id = req.params.id;

    const active = req.body.active;

    const updatedToDo = {};

    // check if the id parameter from the URL is valid
    if (!ObjectId.isValid(id)) {
      res.status(404).json({ message: "id is not a valid hex" });
      return;
    }

    // check if todo exists by id
    const todo = await ToDo.findOne({ _id: id });
    if (!todo) {
      res.status(404).json({ message: "there is no to-do with this id" });
    }

    // body validation
    if (!active) {
      res.status(422).json({ Message: "caiu no !active, " });
      return;
    } else {
      updatedToDo.active = active;
    }

    await ToDo.findByIdAndUpdate(id, updatedToDo);

    res.status(200).json({ message: "xereca" });
  }

  static async deleteToDo(req, res) {
    const id = req.params.id;

    // check if the id parameter from the URL is valid
    if (!ObjectId.isValid(id)) {
      res.status(404).json({ message: "id is not a valid hex" });
      return;
    }

    // check if todo exists by id
    const todo = await ToDo.findOne({ _id: id });
    if (!todo) {
      res.status(404).json({ message: "there is no to-do with this id" });
    }

    
    await ToDo.findByIdAndDelete(id);

    res.status(200).json({message: "Todo removido do banco"})

    return
  }
};
