import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
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
  const [userName, setUserName] = useState("");

  const displayNoneFunction = () => {
    setDisplayNone(!displayNone);
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

    // Get the user name from localStorage
    const storedUserName = localStorage.getItem("name");
    if (storedUserName) {
      setUserName(storedUserName.replace(/"/g, ''));
    }
  }, []);

  const showModal = () => {
    setShow(true);
  };

  const [checkboxes, setCheckboxes] = useState({
    box1: false,
    box2: false,
    box3: false,
  });

  const handleCheckboxChange = (event) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const addNewTask = (task) => {
    setTasks([...tasks, task]);
  };

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
              <img
                onClick={displayNoneFunction}
                src={codicon_collapse}
                alt="collapse"
              />
            </div>
            <div className="backlog-board-row2">
              {tasks.map((task) => (
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
                            : "green",
                      }}
                    ></div>
                    <div className="priority">{task.priority} Priority</div>
                    <div className="edit">
                      <button>
                        <img src={Group544} alt="edit" />
                      </button>
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
                            onChange={handleCheckboxChange}
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
                      <button>Feb 10th</button>
                    </div>
                    <div className="progress-button">
                      <button>Progress</button>
                    </div>
                    <div className="to-do-button">
                      <button>To-do</button>
                    </div>
                    <div className="done-button">
                      <button>Done</button>
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
                            : "green",
                      }}
                    ></div>
                    <div className="priority">{task.priority} Priority</div>
                    <div className="edit">
                      <button>
                        <img src={Group544} alt="edit" />
                      </button>
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
                            onChange={handleCheckboxChange}
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
                      <button>Feb 10th</button>
                    </div>
                    <div className="progress-button">
                      <button>Backlog</button>
                    </div>
                    <div className="to-do-button">
                      <button>Progress</button>
                    </div>
                    <div className="done-button">
                      <button>Done</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>In Progress</h3>
              <img
                onClick={displayNoneFunction}
                src={codicon_collapse}
                alt="collapse"
              />
            </div>
            <div className="backlog-board-row2">
              {tasks.map((task) => (
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
                            : "green",
                      }}
                    ></div>
                    <div className="priority">{task.priority} Priority</div>
                    <div className="edit">
                      <button>
                        <img src={Group544} alt="edit" />
                      </button>
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
                            onChange={handleCheckboxChange}
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
                      <button>Feb 10th</button>
                    </div>
                    <div className="progress-button">
                      <button>Backlog</button>
                    </div>
                    <div className="to-do-button">
                      <button>To-Do</button>
                    </div>
                    <div className="done-button">
                      <button>Done</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>Completed</h3>
              <img
                onClick={displayNoneFunction}
                src={codicon_collapse}
                alt="collapse"
              />
            </div>
            <div className="backlog-board-row2">
              {tasks.map((task) => (
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
                            : "green",
                      }}
                    ></div>
                    <div className="priority">{task.priority} Priority</div>
                    <div className="edit">
                      <button>
                        <img src={Group544} alt="edit" />
                      </button>
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
                            onChange={handleCheckboxChange}
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
                      <button>Feb 10th</button>
                    </div>
                    <div className="progress-button">
                      <button>Backlog</button>
                    </div>
                    <div className="to-do-button">
                      <button>Progress</button>
                    </div>
                    <div className="done-button">
                      <button>To-do</button>
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
