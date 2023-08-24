import React, { useState } from "react";
import "./ToDoForm.css";
import api from "../utils/api";
import useFlashMessage from "../hooks/useFlashMessage";

const ToDoForm = ({ closeDescriptiveModal, getUserToDos }) => {
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
      tododate
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
    <div className="form-container">
      <h1>descriptive todo ----------</h1>
      <form onSubmit={handleSubmit}>
        <div className="title-container">
          <label>To do title </label>
          <input
            name="todotitle"
            required={true}
            value={todotitle}
            placeholder="Enter your to-do"
            onChange={(event) => setTodotitle(event.target.value)}
          />
        </div>
        <div className="category-container">
          <label>To do category </label>
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
          <input
            name="tododescription"
            required={true}
            value={tododescription}
            placeholder="Enter a description for your task"
            type="text"
            onChange={(event) => setTodoDescription(event.target.value)}
          />
        </div>

        <div className="title-container">
          <br />
          <br />
          <br />
          <br />
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
          <button type="submit">Create To Do</button>
        </div>
        <button className="modal-close-button" onClick={closeDescriptiveModal}>
          Fechar
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
