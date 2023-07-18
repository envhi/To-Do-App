import { useEffect, useState } from "react";
import ToDoForm from "./components/ToDoForm";
import SearchBar from "./components/SearchBar";
import "./app.css";
import Modal from "react-modal";
import Section from "./components/Section";

function App() {
  const [todos, setTodos] = useState([]);

  // funçao de GET na rota que retorna todos os to-dos servidor /todos/alltodos
  function getData() {

    fetch(`http://localhost:5000/todos/alltodos`, { method: "GET" }) // mandando uma requisição GET para a api
      .then((response) => response.json()) // api responde e o primeiro then pega a data que veio da resposta da api e transforma em json
      .then((data) => setTodos(data)); // pega essa data que ja foi pra json e passa como argumento pra funçao do state hook
  }

  // funçao de POST para enviar dados para o servidor /todos/add
  function insertData(todotitle, todocategory) {

    fetch(`http://localhost:5000/todos/add`, {
      //
      method: "POST",
      headers: { "Content-Type": "application/json" }, // declarando que o request enviado para o servidor será um JSON
      body: JSON.stringify({
        todotitle: `${todotitle}`,
        todocategory: `${todocategory}`, // transformado os dados do body em json
      }),
    })
      .then((response) => response.json()) 
      .then((data) => getData()); 
  }

  function updateData(todo) {
    fetch(`http://localhost:5000/todos/${todo._id}`, {
      //
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: `${todo.active}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => getData())
      .catch((error) => console.error(error));
  }

  function deleteData(todoid) {
    fetch(`http://localhost:5000/todos/${todoid}`, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
      getData()
    })
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    // utilizando o hook useEffect para ativar a função getData
    
    getData(); // argumento 1: a callback que será executada quando o evento for ativado
  }, []); // argumento2: o efeito: [] significa que o efeito não tem dependencias, ou seja, vai rodar só uma vez imediatamente após o
  // o componente ser montado

  const [search, setSearch] = useState("");

  // TEST MODAL

  const [modalIsOpen, setModalIsOpen] = useState(false);

  Modal.setAppElement("#root");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const sections = [
    {
      sectionname: "In progress tasks",
      bgcolor: "#rgb(255, 249, 167)",
      active: true,
    },
    {
      sectionname: "Completed tasks",
      bgcolor: "#b9ff73",
      active: false,
    },
  ];

  return (
    <div className="container">
      <h1 className="mainh1">To Do App</h1>
      <button className="modal-open-button" onClick={openModal}>
        Click Here to create a new To Do!
      </button>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Form"
      >
        <ToDoForm insertData={insertData} closeModal={closeModal} />
      </Modal>
      <SearchBar search={search} setSearch={setSearch} />

      {sections.map((section) => (
        <Section
          key={section.sectionname}
          sectionname={section.sectionname}
          bgcolor={section.bgcolor}
          updateData={updateData}
          deleteData={deleteData}
          search={search}
          todos={todos.filter((todo) => todo.active === section.active)}
        />
      ))}
    </div>
  );
}

export default App;
