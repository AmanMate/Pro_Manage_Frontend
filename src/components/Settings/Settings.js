import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Settings.css";
import User from "../../assets/icons/Frame 1036.png";
import Email from "../../assets/icons/mdi-light_email.png";
import Password from "../../assets/icons/lock.png";


export default function Settings() {
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: ""
  });

  const handleUpdate = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const handleUpdateSubmit = async () => {
    // Add your submit logic here
  };

  return (
    <div className="Nav-Settings">
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="settings">
        <div className="sett-text">
          <p>Settings</p>
        </div>
        <div className="allInputs">
          <div className="input-wrapper">
            <img src={User} alt="Name Icon" className="input-icon" />
            <input type="text" name="name" placeholder="Name" onChange={handleUpdate} />
          </div>
          <div className="input-wrapper">
            <img src={Email} alt="Email Icon" className="input-icon" />
            <input type="email" name="email" placeholder="Update Email" onChange={handleUpdate} />
          </div>
          <div className="input-wrapper">
            <img src={Password} alt="Old Password Icon" className="input-icon" />
            <input type="password" name="oldPassword" placeholder="Old Password" onChange={handleUpdate} />
          </div>
          <div className="input-wrapper">
            <img src={Password} alt="New Password Icon" className="input-icon" />
            <input type="password" name="newPassword" placeholder="New Password" onChange={handleUpdate} />
          </div>
        </div>
        <button className="updateBtn" onClick={handleUpdateSubmit}>
          Update
        </button>
      </div>
    </div>
  );
}
