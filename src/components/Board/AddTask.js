import React, { useState } from 'react';
import Add from "../../assets/icons/Group 10.png";
import './AddTask.css';

const AddTask = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [assignee, setAssignee] = useState('');
    const [checklistItems, setChecklistItems] = useState([]);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTitle('');
        setPriority('');
        setAssignee('');
        setChecklistItems([]);
    };

    const handleAddChecklistItem = () => {
        const newItems = [
            ...checklistItems,
            { id: Date.now(), text: '' }
        ];
        setChecklistItems(newItems);
    };

    const handleDeleteChecklistItem = (id) => {
        const updatedItems = checklistItems.filter(item => item.id !== id);
        setChecklistItems(updatedItems);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePriorityChange = (value) => {
        setPriority(value);
    };

    const handleAssigneeChange = (event) => {
        setAssignee(event.target.value);
    };

    return (
        <div>
            <button className="add-task" onClick={handleClick}>
                <img src={Add} alt="add-task-button" />
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <form>
                            <label className='Title'>
                                <span>Title <span className="required">*</span></span>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder='Enter Task Title'
                                    required
                                />
                            </label>
                            <div className='Priority'>
                                <span>Priority <span className="required">*</span></span>
                                <div className="button-group">
                                    <button
                                        type="button"
                                        className={`priority-button ${priority === 'high' ? 'active' : ''}`}
                                        onClick={() => handlePriorityChange('high')}
                                    >
                                        High Priority
                                    </button>
                                    <button
                                        type="button"
                                        className={`priority-button ${priority === 'medium' ? 'active' : ''}`}
                                        onClick={() => handlePriorityChange('medium')}
                                    >
                                        Moderate Priority
                                    </button>
                                    <button
                                        type="button"
                                        className={`priority-button ${priority === 'low' ? 'active' : ''}`}
                                        onClick={() => handlePriorityChange('low')}
                                    >
                                        Low Priority
                                    </button>
                                </div>
                            </div>
                            <label className='AssignTo'>
                                <span>Assign to</span>
                                <select
                                    name="assignee"
                                    value={assignee}
                                    onChange={handleAssigneeChange}
                                >
                                    <option value="" disabled>Select an assignee</option>
                                    <option value="user1">User 1</option>
                                    <option value="user2">User 2</option>
                                    <option value="user3">User 3</option>
                                </select>
                            </label>
                            <label className='Checklist'>
                                <span>Checklist ({checklistItems.length}/0) <span className="required">*</span></span>
                                <div className="checklist-items">
                                    {checklistItems.map((item, index) => (
                                        <div key={item.id} className="checklist-item">
                                            <div className="checklist-input">
                                                <input
                                                    type="checkbox"
                                                    id={`item-${item.id}`}
                                                    checked={item.checked || false}
                                                    onChange={() => {}}
                                                    className="checklist-checkbox"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.text}
                                                    onChange={(e) => {
                                                        const updatedItems = [...checklistItems];
                                                        updatedItems[index].text = e.target.value;
                                                        setChecklistItems(updatedItems);
                                                    }}
                                                    placeholder="Enter item text"
                                                    className="checklist-text"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteChecklistItem(item.id)}
                                                    className="delete-button"
                                                >
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="add-new-checklist-item"
                                    onClick={handleAddChecklistItem}
                                >
                                    + Add New
                                </button>
                            </label>
                            <label className='dueDate'>
                                <button
                                type='button'
                                
                                >
                                    Select Due Date
                                </button>
                            </label>
                            <button type="button" onClick={closeModal}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTask;
