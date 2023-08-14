import React, { useEffect, useState } from "react";
import api from "../../../utils/api";

const Profile = () => {
  const [token] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});

  useEffect(() => {
    api
      .get("/users/profile", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [token]);

  return (
    <div className="form-container">
      <h1>My Profile</h1>
      <form>
        <div className="title-container">
          <label>Name</label>
          <p>{user.name}</p>
        </div>
        <div className="title-container">
          <label>E-mail</label>
          <p>{user.email}</p>
        </div>
        <div className="button-container">
          <button type="submit">Update Email</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
