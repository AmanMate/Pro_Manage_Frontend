import axios from "axios";
const backendUrl = `https://pro-manage-back-end-6wc7.onrender.com/api/v1/task`;

export const createTask = async ({ title, priority, assignee, checklistItems, dueDate }) => {
  try {
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
            dueDate
          }),
      });
      return;
  } catch (error) {
      console.log(error);
      alert("Something went wrong");
  }
};

export const getCreateTaskById = async (taskId) => {
  try { 
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    await axios(`${backendUrl}/getTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
       taskId,
      }),
    });
    return;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const updateCreateTaskById = async (taskId, updateData) => {
  try { 
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    await axios(`${backendUrl}/updateTask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
       updateData,
       taskId
      }),
    });
    return;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const deleteTaskById = async (taskId) => {
  try { 
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    await axios(`${backendUrl}/deleteTask`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        taskId
      }),
    });
    return;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const getAllTaskById = async () => {
  try { 
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios(`${backendUrl}/getAllTasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const getTaskStatusById = async (taskId) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios(`${backendUrl}/getStatus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: { taskId },
    });
    return response.data.status;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const updateTaskStatusById = async (taskId, status) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    await axios(`${backendUrl}/updateStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        taskId,
        status,
      }),
    });
    return;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
