import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { updateUser } from "../../api/auth"; // Removed unused import getUserDetails
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import User from "../../assets/icons/Frame 1036.png";
import Email from "../../assets/icons/mdi-light_email.png";
import Password from "../../assets/icons/lock.png";

export default function Settings() {
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    name: "",
    oldName: "",
    email: "",
    oldEmail: "",
    oldPassword: "",
    newPassword: "",
  });

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name")?.replace(/"/g, '');
    if (email && name) {
      setInputEmail(email);
      setInputName(name);
      setUpdateData((prevData) => ({
        ...prevData,
        oldEmail: email,
        oldName: name,
        name: name,
        email: email,
      }));
    }
  }, []);

  const handleUpdate = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      await updateUser(updateData);
      alert("User updated successfully");
      navigate("/login");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error updating user");
    }
  };

  return (
    <div className="Nav-Settings">
      <Navbar />
      <div className="settings">
        <div className="sett-text">
          <p>Settings</p>
        </div>
        <div className="allInputs">
          <div className="input-wrapper">
            <img src={User} alt="Name Icon" className="input-icon" />
            <input
              type="text"
              value={updateData.name}
              name="name"
              placeholder="Name"
              onChange={handleUpdate}
            />
          </div>
          <div className="input-wrapper">
            <img src={Email} alt="Email Icon" className="input-icon" />
            <input
              type="email"
              value={updateData.email}
              name="email"
              placeholder="Update Email"
              onChange={handleUpdate}
            />
          </div>
          <div className="input-wrapper">
            <img src={Password} alt="Old Password Icon" className="input-icon" />
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              onChange={handleUpdate}
            />
          </div>
          <div className="input-wrapper">
            <img src={Password} alt="New Password Icon" className="input-icon" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleUpdate}
            />
          </div>
        </div>
        <button className="updateBtn" onClick={handleUpdateSubmit}>
          Update
        </button>
      </div>
    </div>
  );
}
