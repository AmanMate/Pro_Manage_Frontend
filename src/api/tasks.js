import axios from "axios";
const backendUrl = `http://localhost:4002/api/v1/task`;

export const createTask = async(taskPayload) => {
    try {
        await axios(`${backendUrl}/board`, {
            action: " ",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
             taskPayload,
            }),
          });
        return;
    } catch (error) {
        console.log(error);
        alert("Something went wrong")
    }
}
    