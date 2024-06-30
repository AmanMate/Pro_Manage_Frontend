import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Analytics.css";

export default function Analytics() {
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
                                        <p>0</p>
                                    </li>
                                    <li>
                                        <span>To-Do Tasks</span>
                                        <p>0</p>
                                    </li>
                                    <li>
                                        <span>In-Progress Tasks</span>
                                        <p>0</p>
                                    </li>
                                    <li>
                                        <span>Completed Tasks</span>
                                        <p>0</p>
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
                                        <p>0</p>
                                    </li>
                                    <li>
                                        <span>Moderate Priority</span>
                                        <p>0</p>
                                    </li>
                                    <li>
                                        <span>High Priority</span>
                                        <p>0</p>
                                    </li>
                                    <li>
                                        <span>Due Date Tasks</span>
                                        <p>0</p>
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
