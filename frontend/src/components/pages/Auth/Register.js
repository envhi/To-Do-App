import { useContext, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

/* Context */
import { Context } from "../../../context/UserContext";

function Register() {
  const [user, setUser] = useState({});

  const { register } = useContext(Context);

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    register(user);
  }

  return (
    <div className="form-register-container">
      <h1>Create your account!</h1>
      <form onSubmit={handleSubmit}>
        <div className="name-container">
          <label>Name</label>
          <input
            type="text"
            required={true}
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

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
            type="text"
            required={true}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <div className="button-container">
          <button type="submit">Register</button>
        </div>
        <p>
          Already Registered? <Link to="/">Click Here!</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
