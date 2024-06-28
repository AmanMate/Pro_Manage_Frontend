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
        alert("Error in registering user")
    }
};


export const loginUser = async ({ email, password }) => {

    try {
        const response = await axios(`${backendUrl}/login`, {
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
          if (response.data?.token){
            localStorage.setItem("token", JSON.stringify(response.data?.token));
            localStorage.setItem("name", JSON.stringify(response.data?.name));
            localStorage.setItem("userId", (response.data?.userId));
          }
        return true;
    } catch (error) {
        console.log(error);
        alert("Error in logging user")
    }
}


export const updateUser = async ({ name, email, oldPassword, newPassword }) => {
    console.log('name ->', name);
    console.log('email ->', email);
    console.log('userId ->', localStorage.getItem("userId"));
  try {
    const userId = localStorage.getItem("userId");
    const token = JSON.parse(localStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = token;
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
            userId
          }),
        });
      return;
  } catch (error) {
      console.log(error);
      alert("Error in updating user")
  }
};


export const getUserDetails = async (email) => {
  const token = JSON.parse(localStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = token;
  try {
    const response = await axios(`${backendUrl}/getUserDetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email       
      }),
    });
    return response.data;
  } catch (error) {
    console.log(error);
    alert("Issue with getting user info");
  }
};