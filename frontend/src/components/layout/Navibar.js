import { Link } from "react-router-dom";
import "./Navibar.css";
import { Context } from "../../context/UserContext";
import { useContext } from "react";

function Navibar() {
  const { authenticated, logout } = useContext(Context);

  return (
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
