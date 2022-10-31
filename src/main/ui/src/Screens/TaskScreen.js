import React, { useState } from "react";
import "./TaskScreen.css";
import "./UserMainScreen.css";
import close from "./images/close-sidebar.jpg";
import open from  "./images/open-sidebar.jpg";
import { Link } from "react-router-dom";
import { BsFillCaretRightFill, BsFillCaretDownFill, BsCheckCircle } from "react-icons/bs";

const ExpandableList = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div>
            <div className="task-title" onClick={() => setIsActive(!isActive)}>
                <div>{isActive ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}</div>
                <div>{title}</div>
            </div>
            {isActive && <div className="task-content">{content}</div>}
        </div>
    );
};

function TaskScreen() {
    var closed = false;
    function btnClick() {
        if (closed) {
            document.querySelector(".side-bar").classList.remove("close");
            document.side.src = close;
            document.getElementById("side").style.display = "";
            closed = false;
        } else {
            document.querySelector(".side-bar").classList.add("close");
            document.side.src = open;
            document.getElementById("side").style.display = "none";
            closed = true;
        }
    }

    const n = 4;
    const subtask = {
        details:
            <tr>
                <th>
                    <div class="center-icon"> 
                        <BsCheckCircle class="icon" /> 
                        <Link to="/task-info" type="button" class="task-btn" name="task-button">Sub Task</Link> 
                    </div>
                </th>
                <th>Date</th>
                <th>Priority</th>
            </tr>
    }
    const task = {
        title: <div class="task">Task Title</div>,
        content:
            <div class="subtask-info">
                <table class="task-table">
                    {[...Array(n)].map((e, i) => subtask.details)}
                </table>
            </div>
    }
    const taskData = [...Array(n)].map((e, i) => task)

    return (
        <div class="grid-container">
            <header class="header">
                <div class="title">
                    Connecteam+
                </div>
                <div class="clockin-out">
                    <ul>
                        <li>
                        <button class="clock-btn">
                            Clock in
                        </button>
                        </li>
                        <li>
                        <button class="clock-btn">
                            Clock out
                        </button>
                        </li>
                    </ul>
                </div>  
            </header>
            <div class="container">
                <aside class="side-bar" id="side-menu">
                    <div>
                        <button class="sidebar-close-button" onClick={btnClick}>
                            <img src={close} alt="close" class="close-btn" name="side"/>
                        </button>
                    </div>
                    <div id="side" class="side">
                        <ul class="side-buttons">
                            <li>
                                <Link to="/main" type="button" class="btn" name="button">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/task" type="button" class="btn" name="button">
                                    My tasks
                                </Link>
                            </li>
                            <li>
                                <Link to="/calendar" type="button" class="btn" name="button">
                                    Calendar
                                </Link>
                            </li>
                            <li>
                                <Link to="/message" type="button" class="btn" name="button">
                                    Messages
                                </Link>
                            </li>
                            <li>
                                <Link to="/payroll" type="button" class="btn" name="button">
                                    Payroll
                                </Link>
                            </li>
                        </ul>
                        <Link to="/signin" type="button" class="btn-underline">
                            <button class="logout">
                                Log out
                            </button>
                        </Link>
                        
                    </div>
                </aside>
                <div class="main-contents">
                    <div class="task-info">
                        <table class="task-table">
                            <tr>
                                <th>Task Name</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <div>
                            {taskData.map(({ title, content }) => (
                                <ExpandableList title={title} content={content} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TaskScreen;