import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { getAllTaskById, updateTaskStatusById } from "../../api/tasks";
import "./Board.css";
import database1 from "../../assets/icons/database1.png";
import codicon_collapse from "../../assets/icons/codicon_collapse-all.png";
import stroke1 from "../../assets/icons/up.png";
import arrowDown2 from "../../assets/icons/down.png";
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

  const displayNoneFunction = () => {
    setDisplayNone(!displayNone);
  };

  useEffect(() => {
    const userNameFromStorage = localStorage.getItem("name");
    if (userNameFromStorage) {
      setUserName(userNameFromStorage.replace(/"/g, ""));
    }
  }, []);

  useEffect(() => {
    const formatDate = (date) => {
      const options = { month: "long", day: "numeric" };
      const formattedDate = new Date(date).toLocaleDateString(undefined, options);
      const isPastDate = new Date(date) < new Date();
      return { formattedDate, isPastDate };
    };

    const now = new Date();
    setCurrentDate(formatDate(now).formattedDate);
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
          const mappedTasks = response.tasks.map((task) => ({
            ...task,
            status: mapStatus(task.status),
          }));
          setTasks(mappedTasks);
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

    const newDueDateStyles = {};
    sorted.forEach((task) => {
      const { isPastDate } = formatDate(task.dueDate);
      newDueDateStyles[task._id] = isPastDate ? "past-date" : "";
    });
    setDueDateStyles(newDueDateStyles);
  }, [tasks, sortBy]);

  const handleCheckboxChange = (taskId, itemId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              checklistItems: task.checklistItems.map((item) =>
                item._id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : task
      )
    );
  };

  useEffect(() => {
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
      }
    };
            
    const formatDate = (date) => {
     const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      
      return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    };

    const now = new Date();
    setCurrentDate(formatDate(now));
  }, []);

  const addNewTask = (task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...task,
        _id: task.id,
        status: "to-do",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleEdit = () => {
    // Implement edit functionality
    setShowSubmenu(false);
  };

  const handleShare = () => {
    // Implement share functionality
    setShowSubmenu(false);
  };

  const handleDelete = () => {
    // Implement delete functionality
    setShowSubmenu(false);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Implement delete confirmation logic
    setShowModal(false);
    // Perform deletion action
  };

  const mapStatusToBackend = (frontendStatus) => {
    const statusMap = {
      "to-do": "todo",
      "in-progress": "inprogress",
    };
    return statusMap[frontendStatus] || frontendStatus;
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const backendStatus = mapStatusToBackend(newStatus);
  
      await updateTaskStatusById(taskId, backendStatus);
  
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
  
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

      updatedTasks.forEach((task) => {
        if (task._id === taskId) {
          const { isPastDate } = formatDate(task.dueDate);
          const updatedStyle = newStatus === "completed" ? "completed-date" : (isPastDate ? "past-date" : "");
          setDueDateStyles((prevStyles) => ({
            ...prevStyles,
            [taskId]: updatedStyle,
          }));
        }
      });
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
  

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isImageOne, setIsImageOne] = useState(true);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsImageOne(!isImageOne);
  };

  const [checklistVisibility, setChecklistVisibility] = useState({});

  const toggleChecklistVisibility = (taskId) => {
    setChecklistVisibility((prevVisibility) => ({
      ...prevVisibility,
      [taskId]: !prevVisibility[taskId],
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                <button onClick={handleButtonClick} className="collapse-button">
                  <img src={isImageOne ? codicon_collapse : codicon_collapse} alt="toggle visibility" />
                </button>
              </div>
              <div className="backlog-board-row2" id={status}>
                {sortedTasks
                  .filter((task) => task.status.toLowerCase() === status.toLowerCase())
                  .map((task) => (
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
                                : task.priority === "low"
                                ? "green"
                                : "green",
                          }}
                        ></div>
                        <div className="priority">{task.priority.toUpperCase()} PRIORITY</div>
                        <div className="edit">
                          <button onClick={toggleSubmenu} className="edit-button">
                          </button>
                          {showSubmenu && (
                            <div className="submenu-Board">
                              <button onClick={handleEdit}>Edit</button>
                              <button onClick={handleShare}>Share</button>
                              <button onClick={handleDelete} className="model-delete-option">Delete</button>
                            </div>
                          )}
                          {showModal && (
                            <div className="modal-delete">
                              <div className="modal-content-delete">
                                <span>Are you sure you want to delete?</span>
                                <div className="modal-buttons">
                                  <button onClick={handleConfirmDelete} className="cancel-button-modal">Yes</button>
                                  <button onClick={handleCloseModal} className="delete-button-model">Cancel</button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="board-row2">
                        <h2 className="task-title">{task.title}</h2>
                        {/* <div className="task-owner">
                          {task.assignee}
                        </div> */}
                        <div className="task-details">{task.details}</div>
                      </div>
                      <div className="board-row3">
                        <div className="checklist">
                          <div className="checklist-heading">
                            <p>Checklist({task.checklistItems.filter((item) => item.checked).length}/{task.checklistItems.length})</p>
                            <button className="hide" onClick={() => toggleChecklistVisibility(task._id)}>
                              <img src={checklistVisibility[task._id] ? stroke1 : arrowDown2} alt={checklistVisibility[task._id] ? "Hide" : "Unhide"} />
                            </button>
                          </div>
                          {checklistVisibility[task._id] && (
                            <div className="checklist-items-board">
                              {task.checklistItems.map((item) => (
                                <div key={item._id} className="checklist-item-board">
                                  <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleCheckboxChange(task._id, item._id)}
                                  />
                                  <label>{item.text}</label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="due-date">
                      <button className={`due-date-button ${dueDateStyles[task._id]}`}>
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
