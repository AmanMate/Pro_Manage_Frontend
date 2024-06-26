import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Board.css";
import database1 from "../../assets/icons/database1.png";
import Group544 from "../../assets/icons/Group544.png";
import Stroke1 from "../../assets/icons/Stroke1.png";
import Vector14 from "../../assets/icons/Vector 14.png";
import codicon_collapse from "../../assets/icons/codicon_collapse-all.png";
import AddTask from "./AddTask";

export default function Board() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);

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

  const checkedCount = Object.values(checkboxes).filter(Boolean).length;

  const addNewTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className="wrapper-board">
        <div className="top-row">
          <div className="welcome">
            <p>Welcome Kumar</p>
          </div>
          <div className="date">
            <p>12th Jan, 2024</p>
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
            <p>This week</p>
            <img src={Vector14} alt="arrow"></img>
          </div>
        </div>
        <div className="board-row">
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>Backlog</h3>
              <img src={codicon_collapse} alt="colapse" />
            </div>
          </div>
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>To-Do list</h3>
              <AddTask addNewTask={addNewTask} />
              <img src={codicon_collapse} alt="collapse" />
            </div>
            <div className="backlog-board-row2">
              {tasks.map((task) => (
                <div key={task.id} className="card-section">
                  <div className="priority-edit-row">
                    <div
                      className="small-circle"
                      style={{ backgroundColor: task.priority === "High" ? "red" : "green" }}
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
                      Checklist ({task.checklistItems.filter(item => item.checked).length}/{task.checklistItems.length})
                    </p>
                    <button>
                      <img src={Stroke1} alt="dropdown" />
                    </button>
                  </div>
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
                </div>
              ))}
            </div>
          </div>
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>In Progress</h3>
              <img src={codicon_collapse} alt="colapse" />
            </div>
          </div>
          <div className="board-backlog">
            <div className="backlog-board-row1">
              <h3>Completed</h3>
              <img src={codicon_collapse} alt="completed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
