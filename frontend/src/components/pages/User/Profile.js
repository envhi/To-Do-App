import { useContext, useEffect, useState } from "react";
import ToDoForm from "../../ToDoForm";
import SearchBar from "../../SearchBar";
import Modal from "react-modal";
import Section from "../../Section";
import api from "../../../utils/api";
import { Context } from "../../../context/UserContext";

function Profile() {
  const { authenticated } = useContext(Context);
  const [token] = useState(localStorage.getItem("token") || "");
  const [todos, setTodos] = useState([]);

  function getUserToDos() {
    api
      .get("/users/allusertodos")
      .then((response) => {
        console.log(response)
        setTodos(response.data.allUserToDos);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // function getUserToDos() {
  useEffect(() => {
    api
      .get("/users/allusertodos", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setTodos(response.data.allUserToDos);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [token]);
  // }

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
        <ToDoForm
          getUserToDos={getUserToDos}
          closeModal={closeModal}
        />
      </Modal>
      <SearchBar search={search} setSearch={setSearch} />

      {sections.map((section) => (
        <Section
          getUserToDos={getUserToDos}
          key={section.sectionname}
          sectionname={section.sectionname}
          bgcolor={section.bgcolor}
          search={search}
          todos={todos.filter((todo) => todo.active === section.active)}
          // getUserToDos={getUserToDos}
        />
      ))}
    </div>
  );
}

export default Profile;
