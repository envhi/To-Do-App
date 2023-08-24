import { Link } from "react-router-dom";
import "./Navibar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Context } from "../../context/UserContext";
import { useContext } from "react";

function Navibar() {
  const { authenticated, logout } = useContext(Context);

  return (
    // <Navbar expand="xl" className="custom-navibar">
    //   <Container>
    //     <Navbar.Brand href="/">To Do App</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="/">Home</Nav.Link>
    //         <Nav.Link href="/login">Log In</Nav.Link>
    //         <Nav.Link href="/register">Sign Up</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <div className="navibar-container">
      <nav>
        <h1>To Do App</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {authenticated ? (
            <>
              <li>
                <Link to={"/user/profile"}>Profile</Link>
              </li>
              <li>
                <Link to={"/user/mytodos"}>My To Dos</Link>
              </li>
              <li>
                <Link to={"/user/alluserdonetodos"}>What i've done</Link>
              </li>
              <li onClick={logout}>Logout</li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navibar;
