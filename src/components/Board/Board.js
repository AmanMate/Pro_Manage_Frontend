import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { updateCreateTaskById, deleteTaskById, getCreateTaskById, getAllTaskById } from "../../api/tasks";
import "./Board.css";
import database1 from "../../assets/icons/database1.png";
import Group544 from "../../assets/icons/Group544.png";
import codicon_collapse from "../../assets/icons/codicon_collapse-all.png";
import AddTask from "./AddTask";

export default function Board() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [sortBy, setSortBy] = useState("week");
  const [displayNone, setDisplayNone] = useState(true);
  const [userName, setUserName] = useState(""); // State to hold the user's name
  
  const [isOpen, setIsOpen] = useState(false);
  const submenuRef = useRef(null);
  const buttonRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false); // Renamed isOpen
  
  const handleOpenModal = () => setIsVisible(true);
  const handleCloseModal = () => setIsVisible(false);
  const handleDeleteConfirmed = () => {
    handleSubmenuButtonClick(); // Perform deletion logic here
    handleCloseModal();
  };

  useEffect(() => {
    const userNameFromStorage = localStorage.getItem("name");
    if (userNameFromStorage) {
      setUserName(userNameFromStorage.replace(/"/g, ''));
    }
  }, []);
    
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
    
  const sortTasks = (interval) => {
    let sortedTasks = [...tasks];
    const currentDate = new Date();

    switch (interval) {
      case "today":
        sortedTasks = sortedTasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          const today = new Date();
          return (
            taskDate.getDate() === today.getDate() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getFullYear() === today.getFullYear()
          );
        });
        break;
      case "week":
        sortedTasks = sortedTasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          const diffTime = Math.abs(currentDate - taskDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        });
        break;
      case "month":
        sortedTasks = sortedTasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          return taskDate.getMonth() === currentDate.getMonth();
        });
        break;
      default:
        break;
    }
    setTasks(sortedTasks);
  };

  useEffect(() => {
    sortTasks("week");
  }, []);
  
  const toggleSubmenu = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);



  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");
      console.log('user id-> ',userId);
      if (userId) {
        try {
          const response = await getAllTaskById(userId);
          console.log("This is the returned data ->", response);
          setTasks(response.tasks);
        } catch (error) {
          console.error("Failed to fetch tasks", error);
        }
      }
    };
    fetchTasks();
  }, []);

  const handleSubmenuButtonClick = () => {
    // Handle the button click action here
    setIsOpen(false);
  };

  const showModal = () => {
    setShow(true);
  };

  const [checkboxes, setCheckboxes] = useState({
    box1: false,
    box2: false,
    box3: false,
  });
  
  const displayNoneFunction = () => {
    setDisplayNone(!displayNone);
  };

  const handleCheckboxChange = (taskId, itemId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            checklistItems: task.checklistItems.map((item) =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            ),
          };
        }
        return task;
      });
    });
  };

  const addNewTask = (task) => {
    setTasks([...tasks, task]);
  };

  const sortOptions = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  const formatDate = (date) => {
    const options = {  month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // Perform API call to update the task status in the backend
      // For now, assume it succeeds and update locally
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to update task status", error);
    }
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
                    <button
                      onClick={() => setShow(false)}
                      className="add-email-cancel-button"
                    >
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
              onChange={(e) => {
                setSortBy(e.target.value);
                sortTasks(e.target.value);
              }}
            >
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
            </select>
          </div>
        </div>
        <div className="board-row">
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>Backlog</h3>
              <img src={codicon_collapse} alt="colapse" />
            </div>
            <div className="backlog-board-row2">
              {tasks.filter(task => task.status === 'backlog').map((task) => (
                <div key={task.id} className="card-section">
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
                            : "greenyellow",
                      }}
                    ></div>
                    <div className="priority">{task.priority} Priority</div>
                    <div className="edit">
                      <button
                        id="toggleSubmenuButton"
                        onClick={toggleSubmenu}
                        ref={buttonRef}
                      >
                        <img src={Group544} alt="edit" />
                      </button>
                      {isOpen && (
                        <div
                          id="submenu"
                          className="display-submenu-div"
                          ref={submenuRef}
                        >
                          <button onClick={handleSubmenuButtonClick}>
                            Edit
                          </button>
                          <button onClick={handleSubmenuButtonClick}>
                            Share
                          </button>
                          <button
                            id="delete-button-submenu"
                            onClick={handleOpenModal}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      {isVisible && ( // Use the new state variable name
                        <div>
                          <div className="background"></div>
                          <div className="confirm-delete-modal">
                            <p>Are you sure you want to Delete?</p>
                            <div className="modal-actions">
                              <button
                                className="cancel-button-modal"
                                onClick={handleCloseModal}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleCloseModal}
                                className="delete-button"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <h2>{task.title}</h2>
                  <div className="checklist-and-arrow">
                    <p>
                      Checklist (
                      {
                        task.checklistItems.filter((item) => item.checked)
                          .length
                      }
                      /{task.checklistItems.length})
                    </p>
                  </div>
                  {displayNone && (
                    <div className="checklist">
                      {task.checklistItems.map((item) => (
                        <div key={item.id} className="checklist-options">
                          <input
                            name={item.id}
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(task.id, item.id)}
                            className="checklist-member"
                            type="checkbox"
                          />
                          <label htmlFor={item.id}>{item.text}</label>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="buttons-div display-flex">
                    <div className="date-button">
                      <button>{formatDate(task.dueDate)}</button>
                    </div>
                    <div className="progress-button">
                      <button onClick={() => updateTaskStatus(task.id, "in-progress")}>Progress</button>
                    </div>
                    <div className="to-do-button">
                      <button onClick={() => updateTaskStatus(task.id, "to-do")}>To-do</button>
                    </div>
                    <div className="done-button">
                      <button onClick={() => updateTaskStatus(task.id, "completed")}>Done</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>To-Do list</h3>
              <AddTask addNewTask={addNewTask} />
              <img
                onClick={displayNoneFunction}
                src={codicon_collapse}
                alt="collapse"
              />
            </div>
            <div className="backlog-board-row2">
            {tasks.map((task) => (
            //  {tasks.filter(task => task.status === 'to-do').map((task) => (
                <div key={task.id} className="card-section">
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
                            : "greenyellow",
                      }}
                    ></div>
                    <div className="priority">{task.priority} Priority</div>
                    <div className="edit">
                      <button
                        id="toggleSubmenuButton"
                        onClick={toggleSubmenu}
                        ref={buttonRef}
                      >
                        <img src={Group544} alt="edit" />
                      </button>
                      {isOpen && (
                        <div
                          id="submenu"
                          className="display-submenu-div"
                          ref={submenuRef}
                        >
                          <button onClick={handleSubmenuButtonClick}>
                            Edit
                          </button>
                          <button onClick={handleSubmenuButtonClick}>
                            Share
                          </button>
                          <button
                            id="delete-button-submenu"
                            onClick={handleOpenModal}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      {isVisible && ( // Use the new state variable name
                        <div>
                          <div className="background"></div>
                          <div className="confirm-delete-modal">
                            <p>Are you sure you want to Delete?</p>
                            <div className="modal-actions">
                              <button
                                className="cancel-button-modal"
                                onClick={handleCloseModal}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleCloseModal}
                                className="delete-button"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <h2>{task.title}</h2>
                  <div className="checklist-and-arrow">
                    <p>
                      Checklist (
                      {
                        task.checklistItems.filter((item) => item.checked)
                          .length
                      }
                      /{task.checklistItems.length})
                    </p>
                  </div>
                  {displayNone && (
                    <div className="checklist">
                      {task.checklistItems.map((item) => (
                        <div key={item.id} className="checklist-options">
                          <input
                            name={item.id}
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(task.id, item.id)}
                            className="checklist-member"
                            type="checkbox"
                          />
                          <label htmlFor={item.id}>{item.text}</label>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="buttons-div display-flex">
                    <div className="date-button">
                      <button>{formatDate(task.dueDate)}</button>
                    </div>
                    <div className="progress-button">
                      <button onClick={() => updateTaskStatus(task.id, "in-progress")}>Progress</button>
                    </div>
                    <div className="backlog-button">
                      <button onClick={() => updateTaskStatus(task.id, "backlog")}>Backlog</button>
                    </div>
                    <div className="done-button">
                      <button onClick={() => updateTaskStatus(task.id, "completed")}>Done</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>In Progress</h3>
              <img src={codicon_collapse} alt="colapse" />
            </div>
            <div className="backlog-board-row2">
              {tasks.filter(task => task.status === 'in-progress').map((task) => (
                <div key={task.id} className="card-section">
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
                            : "greenyellow",
                      }}
                    ></div>
                    <div className="priority">{task.priority} Priority</div>
                    <div className="edit">
                      <button
                        id="toggleSubmenuButton"
                        onClick={toggleSubmenu}
                        ref={buttonRef}
                      >
                        <img src={Group544} alt="edit" />
                      </button>
                      {isOpen && (
                        <div
                          id="submenu"
                          className="display-submenu-div"
                          ref={submenuRef}
                        >
                          <button onClick={handleSubmenuButtonClick}>
                            Edit
                          </button>
                          <button onClick={handleSubmenuButtonClick}>
                            Share
                          </button>
                          <button
                            id="delete-button-submenu"
                            onClick={handleOpenModal}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      {isVisible && ( // Use the new state variable name
                        <div>
                          <div className="background"></div>
                          <div className="confirm-delete-modal">
                            <p>Are you sure you want to Delete?</p>
                            <div className="modal-actions">
                              <button
                                className="cancel-button-modal"
                                onClick={handleCloseModal}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleCloseModal}
                                className="delete-button"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <h2>{task.title}</h2>
                  <div className="checklist-and-arrow">
                    <p>
                      Checklist (
                      {
                        task.checklistItems.filter((item) => item.checked)
                          .length
                      }
                      /{task.checklistItems.length})
                    </p>
                  </div>
                  {displayNone && (
                    <div className="checklist">
                      {task.checklistItems.map((item) => (
                        <div key={item.id} className="checklist-options">
                          <input
                            name={item.id}
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(task.id, item.id)}
                            className="checklist-member"
                            type="checkbox"
                          />
                          <label htmlFor={item.id}>{item.text}</label>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="buttons-div display-flex">
                    <div className="date-button">
                      <button>{formatDate(task.dueDate)}</button>
                    </div>
                    <div className="backlog-button">
                      <button onClick={() => updateTaskStatus(task.id, "backlog")}>Backlog</button>
                    </div>
                    <div className="to-do-button">
                      <button onClick={() => updateTaskStatus(task.id, "to-do")}>To-do</button>
                    </div>
                    <div className="done-button">
                      <button onClick={() => updateTaskStatus(task.id, "completed")}>Done</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>Completed</h3>
              <img src={codicon_collapse} alt="completed" />
            </div>
            <div className="backlog-board-row2">
              {tasks.filter(task => task.status === 'completed').map((task) => (
                <div key={task.id} className="card-section">
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
                            : "greenyellow",
                      }}
                    ></div>
                    <div className="priority">{task.priority} Priority</div>
                    <div className="edit">
                      <button
                        id="toggleSubmenuButton"
                        onClick={toggleSubmenu}
                        ref={buttonRef}
                      >
                        <img src={Group544} alt="edit" />
                      </button>
                      {isOpen && (
                        <div
                          id="submenu"
                          className="display-submenu-div"
                          ref={submenuRef}
                        >
                          <button onClick={handleSubmenuButtonClick}>
                            Edit
                          </button>
                          <button onClick={handleSubmenuButtonClick}>
                            Share
                          </button>
                          <button
                            id="delete-button-submenu"
                            onClick={handleOpenModal}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      {isVisible && ( // Use the new state variable name
                        <div>
                          <div className="background"></div>
                          <div className="confirm-delete-modal">
                            <p>Are you sure you want to Delete?</p>
                            <div className="modal-actions">
                              <button
                                className="cancel-button-modal"
                                onClick={handleCloseModal}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleCloseModal}
                                className="delete-button"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <h2>{task.title}</h2>
                  <div className="checklist-and-arrow">
                    <p>
                      Checklist (
                      {
                        task.checklistItems.filter((item) => item.checked)
                          .length
                      }
                      /{task.checklistItems.length})
                    </p>
                  </div>
                  {displayNone && (
                    <div className="checklist">
                      {task.checklistItems.map((item) => (
                        <div key={item.id} className="checklist-options">
                          <input
                            name={item.id}
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(task.id, item.id)}
                            className="checklist-member"
                            type="checkbox"
                          />
                          <label htmlFor={item.id}>{item.text}</label>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="buttons-div display-flex">
                    <div className="date-button">
                      <button>{formatDate(task.dueDate)}</button>
                    </div>
                    <div className="backlog-button">
                      <button onClick={() => updateTaskStatus(task.id, "backlog")}>Backlog</button>
                    </div>
                    <div className="to-do-button">
                      <button onClick={() => updateTaskStatus(task.id, "to-do")}>To-do</button>
                    </div>
                    <div className="progress-button">
                      <button onClick={() => updateTaskStatus(task.id, "in-progress")}>Progress</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


