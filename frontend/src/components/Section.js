import React, { useState } from "react";
import Todo from "./ToDo";
import "./Section.css";

const Section = ({
  todos,
  sectionname,
  bgcolor,
  updateData,
  deleteData,
  search,
}) => {


  return (
    (todos.length > 0) ?
    <div className="container">
      <div style={{ backgroundColor: bgcolor }} className="sectioncontainer">
        <h1>{sectionname}</h1>
      </div>

      <div className="todoscontainer">
        {todos
          .filter((todo) =>
            todo.todotitle.toLowerCase().includes(search.toLowerCase())
              ? todo
              : null
          )
          .map((todo) => (
            <Todo
              deleteData={deleteData}
              updateData={updateData}
              key={todo.todotitle}
              todo={todo}
            />
          ))}
      </div>
    </div> : ''
  );
};

export default Section;
