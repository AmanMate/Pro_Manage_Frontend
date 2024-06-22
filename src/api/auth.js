import axios from "axios";
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
        return true;
    } catch (error) {
        console.log(error);
        alert("Something went wrong")
    }
}


export const updateUser = async ({ name, email, oldPassword, newPassword }) => {
    
  try {
      await axios(`${backendUrl}/settings`, {
          action: " ",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            name,
            email,
            oldPassword,
            newPassword,
          }),
        });
      return;
  } catch (error) {
      console.log(error);
      alert("Something went wrong")
  }
};

