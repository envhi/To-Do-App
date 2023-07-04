import React, { useState } from "react";
import "./ToDoForm.css";


const ToDoForm = ({ insertData, closeModal }) => {
  const [todotitle, setTodotitle] = useState("");
  const [todocategory, setTodocategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`form submitted -> ${todotitle}, ${todocategory} `);
    insertData(todotitle, todocategory);
    setTodotitle("");
    setTodocategory("");
  };

  return (
    <div className="form-container">
      <h1>Create a new To-Do!</h1>
      <form onSubmit={handleSubmit}>
        <div className="title-container">
          <label>To do title </label>
          <input
            required={true}
            value={todotitle}
            placeholder="Enter your to-do"
            onChange={(event) => setTodotitle(event.target.value)}
          />
        </div>
        <div className="category-container">
          <label>To do category </label>
          <select
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
        <button className="modal-close-button" onClick={closeModal}>Fechar</button>
      </form>
    </div>
  );
};

export default ToDoForm;
