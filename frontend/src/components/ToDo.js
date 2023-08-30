import "./ToDo.css";

const Todo = ({ todo, updateData, deleteData }) => {
  const dateYYYYMMDD = todo.createdAt.split("T")[0].split("-");
  const done = todo.updatedAt.split("T")[0].split("-");
  const goalDate = todo.tododate.split("T")[0].split("-");

  return (
    <div className="card-container">
      <div
        className="titlecontainer"
        style={{
          backgroundColor:
            todo.active === true ? "#rgb(255, 249, 167)" : " #b9ff73 ",
        }}
      >
        <p className="title">{todo.todotitle}</p>
        <p className="category">{todo.todocategory}</p>
      </div>

      <div className="description-container">
        <p>{todo.tododescription}</p>
        <p>Goal: {`${goalDate[2]}/${goalDate[1]}/${goalDate[0]}`}</p>
      </div>

      <div className="buttonscontainer">
        {todo.active === true ? (
          <button onClick={() => updateData(todo)} className="done">
            Done
          </button>
        ) : (
          <div>
            <p>Done: {`${done[2]}/${done[1]}/${done[0]}`}</p>
          </div>
        )}

        <button onClick={() => deleteData(todo._id)} className="x">
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
