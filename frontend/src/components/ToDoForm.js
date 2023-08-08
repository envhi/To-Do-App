import React, { useContext, useEffect, useState } from "react";
import "./ToDoForm.css";
import api from "../utils/api";
import useFlashMessage from "../hooks/useFlashMessage";

const ToDoForm = ({ closeModal, getUserToDos }) => {

  // const [token] = useState(localStorage.getItem("token") || "");
  // console.log(token, "console log todo form token");

  const [todotitle, setTodotitle] = useState("");
  const [todocategory, setTodocategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addToDo(todotitle, todocategory);
    getUserToDos()

  };

  async function addToDo(todotitle, todocategory) {
    const todo = {
      todotitle,
      todocategory,
    };

    const data = await api
      .post("/todos/add", todo)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="form-container">
      <h1>Create a new To-Do!</h1>
      <form onSubmit={handleSubmit}>
        <div className="title-container">
          <label>To do title </label>
          <input
            name={todotitle}
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
        <div className="button-container">
          <button type="submit">Create To Do</button>
        </div>
        <button className="modal-close-button" onClick={closeModal}>
          Fechar
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
