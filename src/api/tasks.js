import axios from "axios";
const backendUrl = `http://localhost:4002/api/v1/task`;

export const createTask = async ({ title, priority, assignee, checklistItems, dueDate }) => {
  try {
    const userId = localStorage.getItem("userId");
      const token = JSON.parse(localStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = token;
      await axios(`${backendUrl}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            title,
            priority,
            assignee,
            checklistItems,
            dueDate,
            userId
          }),
      });
      return;
  } catch (error) {
      console.log(error);
      alert("Something went wrong");
  }
};


export const getCreateTaskById = async (taskId, userId) => {
  try { 
    await axios(`${backendUrl}/create-task/${taskId}/${userId}`, {
      action: " ",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
       
      }),
    });
    return;
  } catch (error) {
    console.log(error);
    alert("Something went wrong")
  }
};

export const updateCreateTaskById = async (taskId, updateData) => {
  try { 
    await axios(`${backendUrl}/update/${taskId}/`, {
      action: " ",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
       updateData,
      }),
    });
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    return;
  } catch (error) {
    console.log(error);
    alert("Something went wrong")
  }
};

export const deleteTaskById = async (taskId) => {
  try { 
    await axios(`${backendUrl}/delete/${taskId}/`, {
      action: " ",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
      
      }),
    });
    return;
  } catch (error) {
    console.log(error);
    alert("Something went wrong")
  }
};

export const getAllTaskById = async (userId) => {
  try { 
    await axios(`${backendUrl}/tasks/${userId}/`, {
      action: " ",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
      
      }),
    });
    return;
  } catch (error) {
    console.log(error);
    alert("Something went wrong")
  }
};


