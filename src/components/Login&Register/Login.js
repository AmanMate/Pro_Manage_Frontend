import React, { useState, useEffect } from "react";
import "./Login.css";
import { registerUser, loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Art from "../../assets/images/Art.png";
import Name from "../../assets/icons/Frame 1036.png";
import Email from "../../assets/icons/mdi-light_email.png";
import Password from "../../assets/icons/lock.png";

export default function Login() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("signUp");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // const [jobDetails, setJobDetails] = useState({});

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    setRegisterFormData({ ...registerFormData, [event.target.name]: event.target.value });
  };

  const handleFormChange = (event) => {
    setLoginFormData({ ...loginFormData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (registerFormData.confirmPassword === registerFormData.password) {
      setConfirmPassError("");
    } else {
      setConfirmPassError("Error! Password does not match");
    }
  }, [registerFormData]);

  const handleSubmit = async () => {
    if (!registerFormData.name || !registerFormData.email || !registerFormData.password) {
      alert("Field can't be empty");
      return;
    }
    if (registerFormData.confirmPassword !== registerFormData.password) {
      alert("Passwords doesn't match!");
      return;
    }
    await registerUser(registerFormData);
    setActiveForm("signIn");
  };

  const handleFormSubmit = async () => {
    if (!loginFormData.email || !loginFormData.password) {
      alert("Field can't be empty");
      return;
    }
    try {
      const result = await loginUser(loginFormData);
      console.log(loginFormData.email);
      localStorage.setItem("email", loginFormData.email);
      if (result) {
        navigate("/board");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setActiveForm("signUp");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="blue-div">
          <div>
            <img src={Art} alt="Art" />
            <h2>Welcome aboard my friend</h2>
            <p>Just a couple of clicks and we start</p>
          </div>
        </div>
        <div className="login-signup-form">
          {activeForm === "signIn" && (
            <div className="sign-in-div">
              <h1>Login</h1>
              <div className="input-wrapper">
                <img src={Email} alt="Email Icon" className="input-icon" />
                <input type="email" name="email" onChange={handleFormChange} placeholder="Email" />
              </div>
              <div className="input-wrapper">
                <img src={Password} alt="Password Icon" className="input-icon" />
                <input type="password" name="password" onChange={handleFormChange} placeholder="Password" />
              </div>
            </div>
          )}
          {activeForm === "signUp" && (
            <div className="sign-up-div">
              <h1>Register</h1>
              <div className="input-wrapper">
                <img src={Name} alt="Name Icon" className="input-icon" />
                <input type="text" name="name" onChange={handleChange} placeholder="Name" />
              </div>
              <div className="input-wrapper">
                <img src={Email} alt="Email Icon" className="input-icon" />
                <input type="email" name="email" onChange={handleChange} placeholder="Email" />
              </div>
              <div className="input-wrapper">
                <img src={Password} alt="Password Icon" className="input-icon" />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" />
              </div>
              <div className="input-wrapper">
                <img src={Password} alt="Confirm Password Icon" className="input-icon" />
                <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" />
              </div>
              <div id="confirmPassError">{confirmPassError}</div>
            </div>
          )}
          {activeForm === "signIn" ? (
            <>
              <button
                className="login-button"
                onClick={handleFormSubmit}
                style={{
                  backgroundColor: "#17A2B8",
                  color: "white",
                  border: "1px solid #17A2B8"
                }}
              >
                Login
              </button>
              <div className="havent-dv">Have no account yet?</div>
              <button
                className="signup-button"
                onClick={() => setActiveForm("signUp")}
                style={{
                  backgroundColor: "white",
                  color: "#17A2B8",
                  border: "1px solid #17A2B8"
                }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                className="signup-button"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#17A2B8",
                  color: "white",
                  border: "1px solid #17A2B8"
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
                  border: "1px solid #17A2B8"
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
