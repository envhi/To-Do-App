import styles from "./ToDo.module.css";
const Todo = ({ todo, updateData, deleteData }) => {
  const dateYYYYMMDD = todo.createdAt.split("T")[0].split("-");
  const done = todo.updatedAt.split("T")[0].split("-");


  return (
    <div className={styles.todocontainer}>
      <div
        style={{
          backgroundColor:
            todo.active === true ? "#rgb(255, 249, 167)" : " #b9ff73 ",
        }}
        className={styles.titlecontainer}
      >
        <p>{todo.todotitle}</p>
      </div>

      <div className={styles.categorycontainer}>
        <p>{todo.todocategory}</p>
      </div>

      <p>
        Criado em: {`${dateYYYYMMDD[2]}/${dateYYYYMMDD[1]}/${dateYYYYMMDD[0]}`}
      </p>
      <p>Prazo: {todo.tododate}</p>
      <p>{todo.tododescription}</p>
      <div className={styles.buttonscontainer}>
        {todo.active === true ? (
          <button onClick={() => updateData(todo)} className={styles.done}>
            Done
          </button>

        ) : (
          <p>concluído em: {`${done[2]}/${done[1]}/${done[0]}`}</p>
        )}


        <button onClick={() => deleteData(todo._id)} className={styles.x}>
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
