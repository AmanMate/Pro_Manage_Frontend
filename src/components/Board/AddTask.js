import React, { useState } from "react";
import { createTask } from "../../api/tasks";
import "./AddTask.css";

const AddTask = ({ addNewTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    assignee: "",
    checklistItems: [],
    dueDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { title, priority, checklistItems } = formData;

    if (!title || !priority || !checklistItems.length) {
      alert("Please fill in all required fields and checklist items.");
      return;
    }

    try {
      await createTask(formData);
      addNewTask(formData);
      setIsModalOpen(false);
      setFormData({
        title: "",
        priority: "",
        assignee: "",
        checklistItems: [],
        dueDate: "",
      });
    } catch (error) {
      console.error("Failed to create task", error);
      alert("Failed to create task. Please try again.");
    }
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedItems = formData.checklistItems.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      checklistItems: updatedItems,
    }));
  };

  const handleToggleChecklistItem = (index) => {
    const updatedItems = [...formData.checklistItems];
    updatedItems[index].checked = !updatedItems[index].checked;
    setFormData((prevFormData) => ({
      ...prevFormData,
      checklistItems: updatedItems,
    }));
  };

  const handleAddChecklistItem = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      checklistItems: [
        ...prevFormData.checklistItems,
        { text: "", checked: false },
      ],
    }));
  };

  const selectedCount = formData.checklistItems.filter(
    (item) => item.checked
  ).length;
  const totalCount = formData.checklistItems.length;

  return (
    <div>
      <button
        className="add-task"
        onClick={() => setIsModalOpen(true)}
      ></button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <form>
              <label className="Title">
                <span>
                  Title <span className="required">*</span>
                </span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter Task Title"
                  required
                />
              </label>
              <div className="Priority">
                <span>
                  Priority <span className="required">*</span>
                </span>
                <div className="button-group">
                  <div
                    className="small-circle"
                    style={{
                      backgroundColor: "red",
                    }}
                  ></div>
                  <button
                    type="button"
                    className={`priority-button ${
                      formData.priority === "high" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "priority", value: "high" },
                      })
                    }
                  >
                    High Priority
                  </button>
                  <div
                    className="small-circle diff"
                    style={{
                      backgroundColor: "#18B0FF",
                    }}
                  ></div>
                  <button
                    type="button"
                    className={`priority-button ${
                      formData.priority === "moderate" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "priority", value: "moderate" },
                      })
                    }
                  >
                    Moderate Priority
                  </button>
                  <div
                    className="small-circle"
                    style={{
                      backgroundColor: "yellow",
                    }}
                  ></div>
                  <button
                    type="button"
                    className={`priority-button ${
                      formData.priority === "low" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "priority", value: "low" },
                      })
                    }
                  >
                    Low Priority
                  </button>
                </div>
              </div>
              <label className="AssignTo">
                <span>Assign to</span>
                <select
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an assignee
                  </option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                  <option value="user3">User 3</option>
                </select>
              </label>
              <span>
                Checklist ({selectedCount}/{totalCount})
              </span>
              <label className="Checklist">
                <div className="checklist-items">
                  {formData.checklistItems.map((item, index) => (
                    <div key={index} className="checklist-item">
                      <div className="checklist-input">
                        <input
                          type="checkbox"
                          checked={item.checked || false}
                          onChange={() => handleToggleChecklistItem(index)}
                          className="checklist-checkbox"
                        />
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => {
                            const updatedItems = [...formData.checklistItems];
                            updatedItems[index].text = e.target.value;
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              checklistItems: updatedItems,
                            }));
                          }}
                          placeholder="Enter item text"
                          className="checklist-text"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteChecklistItem(index)}
                          className="delete-button"
                        ></button>
                      </div>
                    </div>
                  ))}
                </div>
              </label>
              <button
                type="button"
                className="add-new-checklist-item"
                onClick={handleAddChecklistItem}
              >
                + Add New
              </button>
              <div className="last-row">
                <label className="dueDate">
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </label>
                <button
                  id="save-button-last"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  id="close-button-last"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
