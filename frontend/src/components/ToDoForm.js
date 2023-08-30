import React, { useState } from "react";
import "./ToDoForm.css";
import api from "../utils/api";
import useFlashMessage from "../hooks/useFlashMessage";

const ToDoForm = ({ closeModal, getUserToDos }) => {
  const [todotitle, setTodotitle] = useState("");
  const [todocategory, setTodocategory] = useState("");
  const [tododescription, setTodoDescription] = useState("");
  const [tododate, setToDoDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addToDo(todotitle, todocategory, tododescription, tododate);
    getUserToDos();
  };

  async function addToDo(todotitle, todocategory, tododescription, tododate) {
    const todo = {
      todotitle,
      todocategory,
      tododescription,
      tododate,
    };

    const data = await api
      .post("/todos/add", todo)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error("Error on creating this to-do:" + error.message);
      });
  }

  return (
    <div className="form-todo-container">
      <h1>Create your task!</h1>
      <form onSubmit={handleSubmit}>
        <div className="title-container">
          <label>Title </label>
          <input
            name="todotitle"
            required={true}
            value={todotitle}
            placeholder="Enter your to-do"
            onChange={(event) => setTodotitle(event.target.value)}
          />
        </div>
        <div className="category-container">
          <label>Category</label>
          <select
            name={todocategory}
            className="select-container"
            required={true}
            value={todocategory}
            placeholder="todocategory here"
            onChange={(event) => setTodocategory(event.target.value)}
          >
            <option></option>
            <option>Personal</option>
            <option>Work</option>
            <option>Studies</option>
          </select>
        </div>
        <div className="description-container">
          <label>Description</label>
          <input
            name="tododescription"
            required={true}
            value={tododescription}
            placeholder="Enter a description for your task"
            type="textbox"
            onChange={(event) => setTodoDescription(event.target.value)}
          />
        </div>

        <div className="deadline-container">
          <label>Deadline</label>
          <input
            type="date"
            name="tododate"
            required={true}
            value={tododate}
            onChange={(event) => setToDoDate(event.target.value)}
          />
        </div>

        <div className="button-container">
          <button type="submit">Create</button>
        </div>
        <div className="modal-close-button-container">
          <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ToDoForm;
