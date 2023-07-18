// models import
const ToDo = require("../models/ToDo");

module.exports = class ToDoService {
  static async getAllUserToDos(id) {
    return await ToDo.find({ "user._id": id });
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

    updatedToDo.active = false;

    return await ToDo.findByIdAndUpdate(id, { $set: updatedToDo });
  }

  static async deleteToDo(id) {
    return await ToDo.findByIdAndRemove(id);
  }
};
