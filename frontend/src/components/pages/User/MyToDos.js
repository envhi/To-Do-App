import { useContext, useEffect, useState } from "react";
import ToDoForm from "../../ToDoForm";
import SearchBar from "../../SearchBar";
import Modal from "react-modal";
import Section from "../../Section";
import api from "../../../utils/api";
import { Context } from "../../../context/UserContext";
import ToDoFormCheckBoxes from "../../ToDoFormCheckBoxes";

function MyToDos() {
  const { authenticated } = useContext(Context);
  const [token] = useState(localStorage.getItem("token") || "");
  const [todos, setTodos] = useState([]);

  function getUserToDos() {
    api
      .get("/users/allusertodos")
      .then((response) => {
        console.log(response);
        setTodos(response.data.allUserToDos);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

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

  const [search, setSearch] = useState("");

  const [descriptiveModalIsOpen, setDescriptiveModalIsOpen] = useState(false);
  // const [checkBoxesModalIsOpen, setcheckBoxesModalIsOpenn] = useState(false);

  Modal.setAppElement("#root");

  const openDescriptiveModal = () => {
    setDescriptiveModalIsOpen(true);
  };

  const closeDescriptiveModal = () => {
    setDescriptiveModalIsOpen(false);
  };

  // const openCheckBoxesModal = () => {
  //   setcheckBoxesModalIsOpenn(true);
  // };

  // const closeCheckBoxesModal = () => {
  //   setcheckBoxesModalIsOpenn(false);
  // };

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
      <h1 className="mainh1">Create your tasks!</h1>
      <button className="modal-open-button" onClick={openDescriptiveModal}>
        Descriptive Task
      </button>
      {/* <button className="modal-open-button" onClick={openCheckBoxesModal}>
        Step by step Task
      </button> */}
      <Modal
        className="modal"
        isOpen={descriptiveModalIsOpen}
        onRequestClose={closeDescriptiveModal}
        contentLabel="Form"
      >
        <ToDoForm getUserToDos={getUserToDos} closeDescriptiveModal={closeDescriptiveModal} />
      </Modal>

      {/* <Modal
        className="modal"
        isOpen={checkBoxesModalIsOpen}
        onRequestClose={closeCheckBoxesModal}
        contentLabel="Form"
      >
        <ToDoFormCheckBoxes getUserToDos={getUserToDos} closeDescriptiveModal={closeCheckBoxesModal} />
      </Modal> */}


      <SearchBar search={search} setSearch={setSearch} />

      {sections.map((section) => (
        <Section
          getUserToDos={getUserToDos}
          key={section.sectionname}
          sectionname={section.sectionname}
          bgcolor={section.bgcolor}
          search={search}
          todos={todos.filter((todo) => todo.active === section.active)}
        />
      ))}
    </div>
  );
}

export default MyToDos;
