import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Board.css";
import database1 from "../../assets/icons/database1.png";
import Group544 from "../../assets/icons/Group544.png";
import Stroke1 from "../../assets/icons/Stroke1.png";
// import Ellipse3 from "../../assets/icons/Ellipse3.png";
import Vector14 from "../../assets/icons/Vector 14.png";
import codicon_collapse from "../../assets/icons/codicon_collapse-all.png";
import AddTask from "./AddTask"
 

export default function Board() {
  const [show, setShow] = useState(false);
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

  return (
    <div style={{ display: 'flex' }}>
        <Navbar />
      <div class="wrapper-board">
        <div class="top-row">
          <div class="welcome">
            <p>Welcome Kumar</p>
          </div>
          <div class="date">
            <p>12th Jan, 2024</p>
          </div>
        </div>
        <div class="second-row">
          <div class="left">
            <h2>Board</h2>
            <div class="add-people">
              <img src={database1} alt="ig" />
              <button onClick={() => setShow(true)}>Add People</button>
            </div>
            {show && (
              <div class="modal-wrapper">
                <div class="container">
                  <p>Add people to the board</p>
                  <input placeholder="Enter the email" />
                  <div class="email-add-buttons">
                    <button
                      onClick={() => setShow(false)}
                      class="add-email-cancel-button"
                    >
                      Cancel
                    </button>
                    <button class="add-email-add-button">Add Email</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div class="right">
            <p>This week</p>
            <img src={Vector14} alt="arrow"></img>
          </div>
        </div>
        <div class="board-row">
          <div class="board-backlog">
            <div class="backlog-board-row1">
              <h3>Backlog</h3>
              <img src={codicon_collapse} alt="colapse" />
            </div>
            <div class="backlog-board-row2">
              <div class="card-section">
                <div class="priority-edit-row">
                  <div
                    className="small-circle"
                    style={{ backgroundColor: "red" }}
                  ></div>

                  <div class="priority">High Priority</div>

                  <div class="edit">
                    <button>
                      <img src={Group544} />
                    </button>
                  </div>
                </div>
                <h2>Hero section</h2>

                <div class="checklist-and-arrow">
                  <p>
                    Checklist ({checkedCount}/{Object.values(checkboxes).length}
                    )
                  </p>
                  <button>
                    <img src={Stroke1} alt="dropdown" />
                  </button>
                </div>

                <div class="checklist">
                  <div class="checklist-options">
                    <input
                      name="box1"
                      checked={checkboxes.box1}
                      onChange={handleCheckboxChange}
                      class="checklist-member"
                      type="checkbox"
                    />
                    <label for="item1">Task to be done</label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box2"
                        checked={checkboxes.box2}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box3"
                        checked={checkboxes.box3}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="backlog-board-row2">
              <div class="card-section">
                <div class="priority-edit-row">
                  <div class="small-circle"></div>
                  <div class="priority">High Priority</div>

                  <div class="edit">
                    <button>
                      <img src={Group544} />
                    </button>
                  </div>
                </div>
                <h2>Hero section</h2>

                <div class="checklist-and-arrow">
                  <p>
                    Checklist ({checkedCount}/{Object.values(checkboxes).length}
                    )
                  </p>
                  <button>
                    <img src={Stroke1} alt="dropdown" />
                  </button>
                </div>

                <div class="checklist">
                  <div class="checklist-options">
                    <input
                      name="box1"
                      checked={checkboxes.box1}
                      onChange={handleCheckboxChange}
                      class="checklist-member"
                      type="checkbox"
                    />
                    <label for="item1">Task to be done</label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box2"
                        checked={checkboxes.box2}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box3"
                        checked={checkboxes.box3}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="board-backlog">
            <div class="backlog-board-row1">
              <h3>To-Do list</h3>
              <AddTask />
              <img src={codicon_collapse} alt="colapse" />
            </div>
            <div class="backlog-board-row2">
              <div class="card-section">
                <div class="priority-edit-row">
                  <div
                    className="small-circle"
                    style={{ backgroundColor: "red" }}
                  ></div>

                  <div class="priority">High Priority</div>

                  <div class="edit">
                    <button>
                      <img src={Group544} />
                    </button>
                  </div>
                </div>
                <h2>Hero section</h2>

                <div class="checklist-and-arrow">
                  <p>
                    Checklist ({checkedCount}/{Object.values(checkboxes).length}
                    )
                  </p>
                  <button>
                    <img src={Stroke1} alt="dropdown" />
                  </button>
                </div>

                <div class="checklist">
                  <div class="checklist-options">
                    <input
                      name="box1"
                      checked={checkboxes.box1}
                      onChange={handleCheckboxChange}
                      class="checklist-member"
                      type="checkbox"
                    />
                    <label for="item1">Task to be done</label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box2"
                        checked={checkboxes.box2}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box3"
                        checked={checkboxes.box3}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="board-backlog">
            <div class="backlog-board-row1">
              <h3>In-Progress</h3>
              <img src={codicon_collapse} alt="colapse" />
            </div>
            <div class="backlog-board-row2">
              <div class="card-section">
                <div class="priority-edit-row">
                  <div
                    className="small-circle"
                    style={{ backgroundColor: "red" }}
                  ></div>

                  <div class="priority">High Priority</div>

                  <div class="edit">
                    <button>
                      <img src={Group544} />
                    </button>
                  </div>
                </div>
                <h2>Hero section</h2>

                <div class="checklist-and-arrow">
                  <p>
                    Checklist ({checkedCount}/{Object.values(checkboxes).length}
                    )
                  </p>
                  <button>
                    <img src={Stroke1} alt="dropdown" />
                  </button>
                </div>

                <div class="checklist">
                  <div class="checklist-options">
                    <input
                      name="box1"
                      checked={checkboxes.box1}
                      onChange={handleCheckboxChange}
                      class="checklist-member"
                      type="checkbox"
                    />
                    <label for="item1">Task to be done</label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box2"
                        checked={checkboxes.box2}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box3"
                        checked={checkboxes.box3}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="board-backlog">
            <div class="backlog-board-row1">
              <h3>Completed</h3>
              <img src={codicon_collapse} alt="colapse" />
            </div>
            <div class="backlog-board-row2">
              <div class="card-section">
                <div class="priority-edit-row">
                  <div
                    className="small-circle"
                    style={{ backgroundColor: "red" }}
                  ></div>

                  <div class="priority">High Priority</div>

                  <div class="edit">
                    <button>
                      <img src={Group544} />
                    </button>
                  </div>
                </div>
                <h2>Hero section</h2>

                <div class="checklist-and-arrow">
                  <p>
                    Checklist ({checkedCount}/{Object.values(checkboxes).length}
                    )
                  </p>
                  <button>
                    <img src={Stroke1} alt="dropdown" />
                  </button>
                </div>

                <div class="checklist">
                  <div class="checklist-options">
                    <input
                      name="box1"
                      checked={checkboxes.box1}
                      onChange={handleCheckboxChange}
                      class="checklist-member"
                      type="checkbox"
                    />
                    <label for="item1">Task to be done</label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box2"
                        checked={checkboxes.box2}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                  <div class="checklist-options">
                    <div class="input">
                      <input
                        name="box3"
                        checked={checkboxes.box3}
                        onChange={handleCheckboxChange}
                        class="checklist-member"
                        type="checkbox"
                      />
                    </div>
                    <label for="item1">
                      Task to be done ede lorem Ipsum is a Dummy text t
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
