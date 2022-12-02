import React, { useState, useEffect } from "react";
import "./TaskInfoScreen.css";
import "./UserMainScreen.css";
import close from "./images/close-sidebar.jpg";
import open from "./images/open-sidebar.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";


const TaskInfoScreen = (props) => {
    var id = localStorage.getItem("ID");
    var task_type = props.location.state.userinfo.type;

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

    const [taskinfo, setTaskInfo] = useState([]);
    const [taskcomments, setTaskComments] = useState([]);
    const [content, setContent] = useState("");

    // function to fetch the data from database
    const getTaskInfo = async () => {
        try {
            Axios.get("http://localhost:3001/task/task-info", {
                params: {
                    id: id,
                    task: props.location.state.userinfo.taskid,
                    type: 'info',
                    extratype: task_type
                }
            }).then((response) => {
                console.log(response.data);
                setTaskInfo(response.data);
            });
            Axios.get("http://localhost:3001/task/task-info", {
                params: {
                    id: id,
                    task: props.location.state.userinfo.taskid,
                    type: 'comments',
                    extratype: task_type
                }
            }).then((response) => {
                console.log(response.data);
                setTaskComments(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // React Hook that executes the fetch function on the first render 
    useEffect(() => {
        getTaskInfo();
    }, []);

    //function to make an object and send data to backend
    const Comment = () => {
        Axios.post("http://localhost:3001/task/task-info", {
            //pass data received from input to backend
            employee_id: id,
            task_id: props.location.state.userinfo.taskid,
            comment_content: content,
            type: 'comment'
        }).then((response) => {
            if (response.data.commentSuccess) {
                console.log(response);
                window.location.reload();
            }
        });
    };

    //function to make an object and send data to backend
    const Complete = () => {
        Axios.post("http://localhost:3001/task/task-info", {
            //pass data received from input to backend
            employee_id: id,
            task_id: props.location.state.userinfo.taskid,
            type: 'complete'
        }).then((response) => {
            if (response.data.completeSuccess) {
                console.log(response);
                window.location.reload();
            }
        });
    };

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
                            <li>
                                <Link to="/people" type="button" className="btn" name="button">
                                    People
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
                        {taskinfo.map((info) => (
                            <table class="task-info-tbl">
                                <tr>
                                    <td><div class="task-header">{info.title}</div></td>
                                    <td rowspan="2">
                                        {info.status === 'complete' ? <p class='complete'>Completed</p> : <button onClick={Complete} class="complete">Complete</button>}
                                    </td>
                                </tr>
                                <tr>
                                    <td><div class="due-date">Due {moment(info.due_date).format('MMMM DD')} by {moment(info.due_time, "HH:mm:ss").format("hh:mm A")}</div></td>
                                </tr>
                                <tr>
                                    <td><div class="desc"> {info.description}</div></td>
                                </tr>
                            </table>
                        ))}
                        <div class="info">
                            <div class="comments">Comments</div>
                            <ul>
                                {taskcomments.map((comment) => (
                                    <li>{comment.FName + " " + comment.LName + ": " + comment.comment}</li>
                                ))}
                            </ul>
                        </div>
                        <div class="form-group">
                            <form>
                                <input type="text" placeholder="Comments..." id="content"
                                    onChange={(event) => setContent(event.target.value)}></input>
                                <button onClick={Comment} type="submit" class="comment">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskInfoScreen;