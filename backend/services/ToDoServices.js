// models import
const ToDo = require("../models/ToDo");

module.exports = class ToDoService {
  static async getAllToDos() {
    return await ToDo.find();
  }

  static async getToDoById(id) {
    return await ToDo.findOne({ _id: id });
  }

  static async addToDo(newToDoData) {
    const todo = new ToDo(newToDoData);
    return await todo.save();
  }

  static async updateToDo(id) {
    const todo = await ToDo.findOne({ _id: id });

    const updatedToDo = {};

    if (!todo) {
      return;
    } else {
      updatedToDo.active = false;
    }

    return await ToDo.findByIdAndUpdate(id, { $set: updatedToDo });
  }

  static async deleteToDo(id) {
    const todo = await ToDo.findOne({ _id: id });

    if (!todo) {
      return;
    } else {
      return await ToDo.findByIdAndDelete(id);
    }
  }
};
