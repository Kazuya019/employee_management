import React, { useState, useEffect } from "react";
import "./TaskScreen.css";
import "./UserMainScreen.css";
import close from "./images/close-sidebar.jpg";
import open from "./images/open-sidebar.jpg";
import { Link } from "react-router-dom";
import { BsCheckCircle, BsFillCheckCircleFill } from "react-icons/bs";
import Axios from "axios";
import moment from "moment";


const ManagerTaskScreen = (props) => {
    var id = localStorage.getItem("ID");

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

    const [ltask, setTask] = useState([]);
    const [latask, setAssignedTask] = useState([]);

    // function to fetch the data from database
    const getTaskData = async () => {
        try {
            Axios.get("http://localhost:3001/task/task", {
                params: { id: id }
            }).then((response) => {
                console.log(response.data);
                setTask(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // function to fetch the data from database
    const getAssignedTaskData = async () => {
        try {
            Axios.get("http://localhost:3001/task/manager-task", {
                params: { id: id }
            }).then((response) => {
                console.log(response.data);
                setAssignedTask(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // React Hook that executes the fetch function on the first render 
    useEffect(() => {
        getTaskData();
        getAssignedTaskData();
    }, []);

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
                            <img src={close} alt="close" class="close-btn" name="side" />
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
                                <Link to="/manager-task" type="button" class="btn" name="button">
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
                        <Link to="/manager-create-task" type="button" class="btn-underline">
                            <button class="create-btn">
                                Create Task
                            </button>
                        </Link>
                        <table class="task-table">
                            <tr>
                                <th>Task Name</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                            </tr>
                            {ltask.map((task) => (
                                <tr>
                                    <th>
                                        <div class="center-icon">
                                            <>
                                                {task.status === 'complete' ? <BsFillCheckCircleFill class="icon" /> : <BsCheckCircle class="icon" />}
                                            </>
                                            <Link to={{
                                                pathname: "/manager-task-info",
                                                state: {
                                                    userinfo: {
                                                        taskid: task.task_id,
                                                        type: 'own'
                                                    }
                                                }
                                            }}
                                                type="button" class="task-btn" name="task-button">
                                                {task.title}
                                            </Link>
                                        </div>
                                    </th>
                                    <th>{moment(task.due_date).format('MM/DD/YY')}</th>
                                    <th>{task.priority}</th>
                                </tr>
                            ))}
                            <tr>
                                <th colSpan={3}>Tasks assigned to team members</th>
                            </tr>
                            {latask.map((atask) => (
                                <tr>
                                    <th>
                                        <div class="center-icon">
                                            <>
                                                {atask.status === 'complete' ? <BsFillCheckCircleFill class="icon" /> : <BsCheckCircle class="icon" />}
                                            </>
                                            <Link to={{
                                                pathname: "/manager-task-info",
                                                state: {
                                                    userinfo: {
                                                        taskid: atask.task_id,
                                                        type: 'assigned'
                                                    }
                                                }
                                            }}
                                                type="button" class="task-btn" name="task-button">
                                                {atask.title}
                                            </Link>
                                        </div>
                                    </th>

                                    <th>{moment(atask.due_date).format('MM/DD/YY')}</th>
                                    <th>{atask.priority}</th>
                                </tr>
                            ))}
                        </table>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagerTaskScreen;