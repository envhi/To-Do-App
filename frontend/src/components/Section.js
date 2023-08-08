import Todo from "./ToDo";
import "./Section.css";
import api from "../utils/api";

const Section = ({
  todos,
  getUserToDos,
  sectionname,
  bgcolor,
  search,
}) => {
  

  async function updateData(todo) {
    const data = await api
      .patch(`/todos/${todo._id}`)
      .then((response) => {
        getUserToDos()
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteData(todoid) {
    const data = await api
      .delete(`/todos/${todoid}`)
      .then((response) => {
        getUserToDos()
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }


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
              key={todo._id}
              todo={todo}
            />
          ))}
      </div>
    </div> : ''
  );
};

export default Section;
