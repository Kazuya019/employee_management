import React, { useState, useEffect } from "react";
import "./TaskInfoScreen.css";
import "./UserMainScreen.css";
import close from "./images/close-sidebar.jpg";
import open from "./images/open-sidebar.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";


const ManagerTaskInfoScreen = (props) => {
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

    var timer = new Date();
    const [ClockInStatus, setClockInStatus] = useState("");
    const [ClockOutStatus, setClockOutStatus] = useState("");
    var today = moment().format('YYYY-MM-DD');

    function clickIn() {
        console.log('AAA');
        var time = moment().format('HH:mm');
        Axios.post("http://localhost:3001/main/clock-in", {
            //pass data received from input to backend
            employee_id: id,
            date: today,
            time: time,
        }).then((response) => {
            setClockInStatus(response.data.message);
        });

        const mask = document.getElementById("modal-overlay");
        const modal = document.getElementById("modal");

        mask.classList.remove("hidden");
        modal.classList.remove('hidden');

        localStorage.setItem("Clock in", timer.toLocaleTimeString())
        console.log(moment().format('HH:mm'));

        mask.addEventListener('click', () => {
            mask.classList.add('hidden');
            modal.classList.add('hidden');
        });
    }

    function clickOut() {
        var time = moment().format('HH:mm');
        
        Axios.post("http://localhost:3001/main/clock-out", {
            //pass data received from input to backend
            employee_id: id,
            date: today,
            time: time,
        }).then((response) => {
            setClockOutStatus(response.data.message);
        });

        const mask = document.getElementById("modal-overlay");
        const modal = document.getElementById("modal-out");

        mask.classList.remove("hidden");
        modal.classList.remove('hidden');

        localStorage.setItem("Clock out", timer.toLocaleTimeString())

        mask.addEventListener('click', () => {
            mask.classList.add('hidden');
            modal.classList.add('hidden');
        });
    }

    return (
        <div class="grid-container">
            <div className="hidden" id="modal-overlay"></div>
            <header class="header">
                <div class="title">
                    Connecteam+
                </div>
                <div class="clockin-out">
                    <ul>
                        <li>
                            <button className="clock-btn" id="btn" onClick={clickIn}>
                                Clock in
                            </button>
                        </li>
                        <li>
                            <button className="clock-btn" id="btn-out" onClick={clickOut}>
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
                    <div id="modal" className="hidden">
                        <p>{ClockInStatus}</p>
                    </div>
                    <div id="modal-out" className="hidden">
                        <p>{ClockOutStatus}</p>
                    </div>
                    <div class="task-info">
                        {taskinfo.map((info) => (
                            <table class="task-info-tbl">
                                <tr>
                                    <td><div class="task-header">{info.title}</div></td>
                                    {task_type === 'assigned' ?
                                        <td rowspan="2">
                                            <div style={{color: '#1329a6', fontWeight: 'bold', textDecoration: 'underline'}}>Status:</div> {info.status}
                                        </td> :
                                        <td rowspan="2">
                                            {info.status === 'complete' ? <p class='complete'>Completed</p> : <button onClick={Complete} class="complete">Complete</button>}
                                        </td>
                                    }
                                </tr>
                                <tr>
                                    <td><div class="due-date">Due {moment(info.due_date).format('MMMM DD')} by {moment(info.due_time, "HH:mm:ss").format("hh:mm A")}</div></td>
                                </tr>
                                {task_type === 'assigned' ?
                                    <tr>
                                        <td><div class="due-date">{"Assigned to: " + info.FName + " " + info.LName}</div></td>
                                    </tr> : <tr></tr>
                                }
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
                                <textarea type="text" placeholder="Comments..." id="content"
                                    onChange={(event) => setContent(event.target.value)}></textarea>
                                <button onClick={Comment} type="submit" class="comment">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagerTaskInfoScreen;