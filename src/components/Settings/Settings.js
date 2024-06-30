import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { updateUser, getUserDetails } from "../../api/auth";
import "./Settings.css";
import User from "../../assets/icons/Frame 1036.png";
import Email from "../../assets/icons/mdi-light_email.png";
import Password from "../../assets/icons/lock.png";


export default function Settings() {
  const [updateData, setUpdateData] = useState({
    name: "",
    oldName: "",
    email: "",
    oldEmail: "",
    oldPassword: "",
    newPassword: "",
  });

  // const [showData, setShowData] = useState({
  //   oldEmail: "",
  //   oldName: "",
  // })

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  useEffect(() => {
    // console.log("getting the items " + localStorage.getItem("email"));
    // console.log("getting the items " + localStorage.getItem("name"));
    const storedValue = localStorage.getItem("email", "name");
    var email = localStorage.getItem("email");
    var name = localStorage.getItem("name");
    name = name.replace(/"/g, '');
    if (storedValue) {
      // console.log(storedValue + "storedvalue");  
      setInputEmail(email);
      setInputName(name);
      updateData.name = name;
      updateData.email = email;
    }
    }, [])

  const handleUpdate = (event) => {
    console.log(event.target.value);
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      updateData.oldEmail = localStorage.getItem("email");
      updateData.oldName = localStorage.getItem("name");
      // await getUserDetails(updateData);
      await updateUser(updateData);
      alert("User updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error getting user");
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
            <input type="text" value={updateData.name} name="name" placeholder="Name" onChange={handleUpdate} />
          </div>
          <div className="input-wrapper">
            <img src={Email} alt="Email Icon" className="input-icon" />
            <input type="email" value={updateData.email}  name="email" placeholder="Update Email" onChange={handleUpdate} />
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
