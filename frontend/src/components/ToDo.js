import React, { useState } from "react";
import styles from './ToDo.module.css'
const Todo = ({ todo, updateData, deleteData }) => {


  return (
      <div className={styles.todocontainer}>

        <div style={{ backgroundColor: todo.active === true ? "#rgb(255, 249, 167)" : " #b9ff73 " }} className={styles.titlecontainer}>
          <p>{todo.todotitle}</p>
        </div>

        <div  className={styles.categorycontainer}>
          <p>{todo.todocategory}</p>
        </div>

        <div className={styles.buttonscontainer}>
          { (todo.active === true ? <button onClick={() => updateData(todo)} className={styles.done}>Done</button> : '')}
          <button onClick={() => deleteData(todo)} className={styles.x}>X</button>
        </div>
        
      </div>
      
  );
};

export default Todo;
