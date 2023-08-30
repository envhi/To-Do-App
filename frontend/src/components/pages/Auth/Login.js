import { Link } from "react-router-dom";
import "./Login.css";
import { useContext, useState } from "react";
import { Context } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});

  const { login } = useContext(Context);

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(user);
  }

  return (
    <div className="form-login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="email-container">
          <label>E-mail</label>
          <input
            type="email"
            required={true}
            name="email"
            placeholder="Enter your e-mail"
            onChange={handleChange}
          />
        </div>

        <div className="password-container">
          <label>Password</label>
          <input
            type="password"
            required={true}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <div className="button-container">
          <button type="submit">Login</button>
        </div>
        <p>
          Not registered yet? <Link to="/register">Click Here!</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
