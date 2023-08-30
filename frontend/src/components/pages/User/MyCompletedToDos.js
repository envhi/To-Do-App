import React, { useContext, useEffect, useState } from "react";
import api from "../../../utils/api";
import { Context } from "../../../context/UserContext";
import Todo from "../../ToDo";

const MyCompletedToDos = () => {
  const { authenticated } = useContext(Context);
  const [token] = useState(localStorage.getItem("token") || "");
  const [todos, setTodos] = useState([]);

  // function getUserDoneToDos() {
  //   api
  //     .get("/users/alluserdonetodos")
  //     .then((response) => {
  //       setTodos(response.data.allUserDoneToDos);
  //       console.log(todos)
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }

  useEffect(() => {
    api
      .get("/users/alluserdonetodos", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setTodos(response.data.allUserDoneToDos);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [token]);

  return (
    <div>
      {todos.map((todo) => (
        <Todo todo={todo} />
      ))}
    </div>
  );
};

export default MyCompletedToDos;
