import React, { useState } from "react";
import "./TaskScreen.css";
import "./UserMainScreen.css";
import { Link } from "react-router-dom";
import { BsFillCaretRightFill, BsFillCaretDownFill, BsCheckCircle } from 'react-icons/bs';

const ExpandableList = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div >
            <div className="task-title" onClick={() => setIsActive(!isActive)}>
                <div>{isActive ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}</div>
                <div>{title}</div>
            </div>
            {isActive && <div className="task-content">{content}</div>}
        </div>
    );
};

function TaskScreen() {
    const n = 4;
    const subtask = {
        details:
            <tr>
                <th><div class='center-icon'> <BsCheckCircle class='icon' /> Sub Task </div></th>
                <th>Date</th>
                <th>Priority</th>
            </tr>
    }
    const task = {
        title: <div class='task'>Task Title</div>,
        content:
            <div class="subtask-info">
                <table>
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
                            Clock In
                        </li>
                        <li>
                            Clock Out
                        </li>
                    </ul>
                </div>
            </header>
            <div class="container">
                <div class="side-menu">
                    <ul class="side-buttons">
                        <li>
                            <Link to="/signin" type="button" class="btn" name="button">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" type="button" class="btn" name="button">
                                My tasks
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" type="button" class="btn" name="button">
                                Calendar
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" type="button" class="btn" name="button">
                                Messages
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" type="button" class="btn" name="button">
                                Payroll
                            </Link>
                        </li>
                    </ul>
                    <button class="logout">Logout</button>
                </div>
                <div class="main-contents">
                    <div class="task-info">
                        <table>
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
            <footer>
                Contact
            </footer>
        </div>
    );
}
export default TaskScreen;