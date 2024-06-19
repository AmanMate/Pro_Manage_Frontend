import axios from "axios";
// import { useNavigate } from "react-router-dom";
const backendUrl = `http://127.0.0.1:4002/api/v1/auth`;

export const registerUser = async ({ name, email, password }) => {
    
    try {
        await axios(`${backendUrl}/register`, {
            action: " ",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              name: name,
              email: email,
              password: password
            }),
          });
        
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
              email: email,
              password: password
            }),
          });
        //   if(res.status(200)){
        //     navigate("/dashboard");
        //   }
    } catch (error) {
        console.log(error);
        alert("Something went wrong")
    }
}

