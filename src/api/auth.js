import axios from "axios";
// import { useNavigate } from "react-router-dom";
const backendUrl = `http://localhost:4002/api/v1/auth`;

export const registerUser = async ({ name, email, password }) => {
    
    try {
        await axios(`${backendUrl}/register`, {
            action: " ",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              name,
              email,
              password,
            }),
          });
        return;
    } catch (error) {
        console.log(error);
        alert("Something went wrong")
    }
};

export const loginUser = async ({ email, password }) => {
    // const navigate = useNavigate();

    try {
        await axios(`${backendUrl}/login`, {
            action: " ",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              email,
              password,
            }),
          });
          // if(res.status(200)){
          //   navigate("/dashboard");
          // }

        return true;
    } catch (error) {
        console.log(error);
        alert("Something went wrong")
    }
}

export const updateUser = async ({ name, email, password }) => {
    
  try {
      await axios(`${backendUrl}/settings`, {
          action: " ",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            name,
            email,
            password,
          }),
        });
      return;
  } catch (error) {
      console.log(error);
      alert("Something went wrong")
  }
};

