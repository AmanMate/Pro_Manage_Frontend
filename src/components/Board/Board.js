import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { getAllTaskById, updateTaskStatusById  } from "../../api/tasks";
import "./Board.css";
import database1 from "../../assets/icons/database1.png";
import Group544 from "../../assets/icons/Group544.png";
import codicon_collapse from "../../assets/icons/codicon_collapse-all.png";
import AddTask from "./AddTask";

export default function Board() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [sortBy, setSortBy] = useState("week");
  const [displayNone, setDisplayNone] = useState(true);
  const [userName, setUserName] = useState("");
  const [dueDateStyles, setDueDateStyles] = useState({});

  useEffect(() => {
    const userNameFromStorage = localStorage.getItem("name");
    if (userNameFromStorage) {
      setUserName(userNameFromStorage.replace(/"/g, ''));
    }
  }, []);

  useEffect(() => {
    const formatDate = (date) => {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    };

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    const now = new Date();
    setCurrentDate(formatDate(now));
  }, []);

  const mapStatus = (apiStatus) => {
    const statusMap = {
      todo: "to-do",
      inprogress: "in-progress",
      // Add more mappings if needed
    };
    return statusMap[apiStatus.toLowerCase()] || apiStatus.toLowerCase();
  };

  const getSortedTasks = (tasksToSort, interval) => {
    let sortedTasks = [...tasksToSort];
    const currentDate = new Date();

    switch (interval) {
      case "today":
        return sortedTasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          return (
            taskDate.getDate() === currentDate.getDate() &&
            taskDate.getMonth() === currentDate.getMonth() &&
            taskDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case "week":
        return sortedTasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          const diffTime = Math.abs(currentDate - taskDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        });
      case "month":
        return sortedTasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          return taskDate.getMonth() === currentDate.getMonth();
        });
      default:
        return sortedTasks;
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await getAllTaskById(userId);
          console.log("API response:", response);
          setTasks(response.tasks.map(task => ({...task, status: mapStatus(task.status)})));
        } catch (error) {
          console.error("Failed to fetch tasks", error);
        }
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const sorted = getSortedTasks(tasks, sortBy);
    console.log("Sorted tasks:", sorted);
    setSortedTasks(sorted);

    sorted.forEach((task) => {
      const { isPastDate } = formatDate(task.dueDate);
      setDueDateStyles((prevStyles) => ({
        ...prevStyles,
        [task._id]: isPastDate ? "past-date" : "",
      }));
    });
  }, [tasks, sortBy]);

  const handleCheckboxChange = (taskId, itemId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            checklistItems: task.checklistItems.map((item) =>
              item._id === itemId ? { ...item, checked: !item.checked } : item
            ),
          };
        }
        return task;
      });
    });
  };

  const addNewTask = (task) => {
    setTasks(prevTasks => [...prevTasks, {
      ...task,
      _id: task.id,
      status: "to-do",
      createdAt: new Date().toISOString()
    }]);
  };

  // Add this mapping function at the top of your file or in a separate utility file
  const mapStatusToBackend = (frontendStatus) => {
    const statusMap = {
      "to-do": "todo",
      "in-progress": "inprogress",
      // Add other mappings if needed
    };
    return statusMap[frontendStatus] || frontendStatus;
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // Convert the frontend status to the backend format
      const backendStatus = mapStatusToBackend(newStatus);

      // Make the API call to update the status
      await updateTaskStatusById(taskId, backendStatus);

      // Update the local state
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);

      // Update the due date styles
      if (newStatus === "completed") {
        setDueDateStyles((prevStyles) => ({
          ...prevStyles,
          [taskId]: "completed-date",
        }));
      } else {
        const task = updatedTasks.find((task) => task._id === taskId);
        const { isPastDate } = formatDate(task.dueDate);
        setDueDateStyles((prevStyles) => ({
          ...prevStyles,
          [taskId]: isPastDate ? "past-date" : "",
        }));
      }
    } catch (error) {
      console.error("Failed to update task status", error);
      alert("Failed to update task status. Please try again.");
    }
  };

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    const isPastDate = new Date(date) < new Date();
    return { formattedDate, isPastDate };
  };

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className="wrapper-board">
        <div className="top-row">
          <div className="welcome">
            <p>Welcome {userName}</p>
          </div>
          <div className="date">
            <p>{currentDate}</p>
          </div>
        </div>
        <div className="second-row">
          <div className="left">
            <h2>Board</h2>
            <div className="add-people">
              <img src={database1} alt="ig" />
              <button onClick={() => setShow(true)}>Add People</button>
            </div>
            {show && (
              <div className="modal-wrapper">
                <div className="container">
                  <p>Add people to the board</p>
                  <input placeholder="Enter the email" />
                  <div className="email-add-buttons">
                    <button onClick={() => setShow(false)} className="add-email-cancel-button">
                      Cancel
                    </button>
                    <button className="add-email-add-button">Add Email</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
            </select>
          </div>
        </div>
        <div className="board-row">
          {["backlog", "to-do", "in-progress", "completed"].map((status) => (
            <div className="board-backlog" key={status}>
              <div className="backlog-board-row1">
                <h3>{status.replace("-", " ").toUpperCase()}</h3>
                {status === "to-do" && <AddTask addNewTask={addNewTask} />}
                <img
                  onClick={() => setDisplayNone(!displayNone)}
                  src={codicon_collapse}
                  alt="collapse"
                />
              </div>
              <div className="backlog-board-row2" id={status}>
                {sortedTasks.filter((task) => task.status.toLowerCase() === status.toLowerCase()).map((task) => (
                  <div key={task._id} className="card-section">
                    <div className="priority-edit-row">
                      <div
                        className="small-circle"
                        style={{
                          backgroundColor:
                            task.priority === "high"
                              ? "red"
                              : task.priority === "moderate"
                              ? "yellow"
                              : "green",
                        }}
                      ></div>
                      <div className="priority">{task.priority} Priority</div>
                      <div className="edit">
                        <img src={Group544} alt="edit" />
                      </div>
                    </div>
                    <div className="board-row2">
                      <div className="task-title">{task.title}</div>
                      <div className="task-owner">
                        <div
                          className={`owner-circle ${task.assignee && "blue-bg"}`}
                        >
                          {task.assignee ? task.assignee[0] : "?"}
                        </div>
                        {task.assignee}
                      </div>
                      <div className="task-details">{task.details}</div>
                    </div>
                    <div className="board-row3">
                      <div className="checklist">
                        <div className="checklist-heading">
                          <h4>Checklist({task.checklistItems.filter((item) => item.checked).length}/{task.checklistItems.length})</h4>
                        </div>
                        <div className="checklist-items">
                          {task.checklistItems.map((item) => (
                            <div key={item._id}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={item.checked}
                                  onChange={() =>
                                    handleCheckboxChange(task._id, item._id)
                                  }
                                />
                                {item.text}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                      <div className="due-date">
                        <button className={dueDateStyles[task._id]}>
                          {formatDate(task.dueDate).formattedDate}
                        </button>
                      </div>
                    <div className="move-task-buttons">
                      {status !== "backlog" && (
                        <button onClick={() => updateTaskStatus(task._id, "backlog")}>
                          Backlog
                        </button>
                      )}
                      {status !== "to-do" && (
                        <button onClick={() => updateTaskStatus(task._id, "to-do")}>
                          To-Do
                        </button>
                      )}
                      {status !== "in-progress" && (
                        <button onClick={() => updateTaskStatus(task._id, "in-progress")}>
                        Progress
                        </button>
                      )}
                      {status !== "completed" && (
                        <button onClick={() => updateTaskStatus(task._id, "completed")}>
                          Done
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}