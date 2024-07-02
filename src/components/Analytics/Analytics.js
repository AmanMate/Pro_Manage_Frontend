// Analytics.js
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { getAllTaskById } from "../../api/tasks";
import "./Analytics.css";

export default function Analytics() {
    const [taskCounts, setTaskCounts] = useState({
        backlog: 0,
        toDo: 0,
        inProgress: 0,
        completed: 0,
        lowPriority: 0,
        moderatePriority: 0,
        highPriority: 0,
        dueDate: 0,
    });

    useEffect(() => {
        const fetchTaskCounts = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("userId"));
                const data = await getAllTaskById(userId);
                setTaskCounts({
                    backlog: data.backlog || 0,
                    toDo: data.todo || 0,
                    inProgress: data.inProgress || 0,
                    completed: data.completed || 0,
                    low: data.low || 0,
                    moderate: data.moderate || 0,
                    high: data.high || 0,
                    dueDate: data.dueDate || 0,
                });
            } catch (error) {
                console.error("Error fetching task counts:", error);
            }
        };

        fetchTaskCounts();
    }, []);

    return (
        <div className="Nav-Analytics">
            <Navbar />
            <div className="Analytics">
                <h1>Analytics</h1>
                <div className="analystics-boxes">
                    <div className="box">
                        <div className="inner-box">
                            <div className="category-count">
                                <ul>
                                    <li>
                                        <span>Backlog Tasks</span>
                                        <p>{taskCounts.backlog}</p>
                                    </li>
                                    <li>
                                        <span>To-Do Tasks</span>
                                        <p>{taskCounts.toDo}</p>
                                    </li>
                                    <li>
                                        <span>In-Progress Tasks</span>
                                        <p>{taskCounts.inProgress}</p>
                                    </li>
                                    <li>
                                        <span>Completed Tasks</span>
                                        <p>{taskCounts.completed}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <div className="inner-box">
                            <div className="category-count">
                                <ul>
                                    <li>
                                        <span>Low Priority</span>
                                        <p>{taskCounts.lowPriority}</p>
                                    </li>
                                    <li>
                                        <span>Moderate Priority</span>
                                        <p>{taskCounts.moderatePriority}</p>
                                    </li>
                                    <li>
                                        <span>High Priority</span>
                                        <p>{taskCounts.highPriority}</p>
                                    </li>
                                    <li>
                                        <span>Due Date Tasks</span>
                                        <p>{taskCounts.dueDate}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
