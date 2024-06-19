import React, { useState, useEffect } from "react";
import "./Login.css";
import { registerUser } from "../../api/auth";
import { loginUser } from "../../api/auth";
import Art from "../../assets/images/Art.png"

export default function Login() {
  const [activeForm, setActiveForm] = useState("signUp");
  const [formData, setformData] = useState(
    {
      name:"",
      email:"",
      password:""
    }
  )

  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name] : event.target.value })
  };

  useEffect(() =>{
    console.log(formData);
  }, [formData])

  const handleSubmit = async() => {
    if(
      !formData.name ||
      !formData.email ||
      !formData.password
     ) {
      alert("Field can't be empty");
      return;
    }

    await registerUser(formData);
    setActiveForm("signIn")
  }; 

  return (
    <div>
    <div className="wrapper">
      <div className="blue-div">
        <div>
          <img src={Art} alt="image" />
          <h2>Welcome aboard my friend</h2>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className="login-sigup-form">
        {activeForm === "signIn" && (
          <div className="sign-in-div">
            <h1>Login</h1>
            <input type="email" onChange={handleChange} placeholder="Email" />
            <input type="password" onChange={handleChange} placeholder="Password"></input>
          </div>
        )}
        {activeForm === "signUp" && (
          <div className="sign-up-div">
            <h1>Register</h1>
            <input type="text" name="name" onChange={handleChange} placeholder="Name" />
            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password"></input>
            <input type="password" placeholder="Confirm Password"></input>
          </div>
        )}
        {activeForm === "signIn" ? (
          <>
            <button
              className="login-button"
              onClick={() => handleSubmit('login')}
              // disabled={true}
              style={{
                backgroundColor: "#17A2B8",
                color: "white",
                border: "1px solid #17A2B8",
              }}
            >
              Login
            </button>
            <div className="havent-dv">Have no account yet?</div>
            <button
              className="signup-button"
              onClick={() => setActiveForm('signUp')}
              style={{
                backgroundColor: "white",
                color: "#17A2B8",
                border: "1px solid #17A2B8",
              }}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <button
              className="signup-button"
              onClick={() => handleSubmit('register')}
              // disabled={true}
              style={{
                backgroundColor: "#17A2B8",
                color: "white",
                border: "1px solid #17A2B8",
              }}
            >
              Register
            </button>
            <div className="havent-dv">Have an account?</div>
            <button
              className="login-button"
              onClick={() => setActiveForm("signIn")}
              style={{
                backgroundColor: "white",
                color: "#17A2B8",
                border: "1px solid #17A2B8",
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  </div>
  );
}


// () => setActiveForm("signIn")