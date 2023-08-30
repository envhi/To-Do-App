import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import "./Profile.css";

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
    <div className="profile-container">
      <h1>My Profile</h1>
      <form>
        <div className="name-container">
          <label>Name</label>
          <p>{user.name}</p>
        </div>
        <div className="email-container">
          <label>E-mail</label>
          <p>{user.email}</p>
        </div>
      </form>
    </div>
  );
};

export default Profile;
