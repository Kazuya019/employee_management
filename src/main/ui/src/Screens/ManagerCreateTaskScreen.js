import React, { useState, useEffect } from "react";
import "./UserMainScreen.css";
import "./ManagerCreateTaskScreen.css";
import { Link } from "react-router-dom";
import close from './images/close-sidebar.jpg';
import open from './images/open-sidebar.jpg';
import Axios from "axios";
import moment from "moment";


const ManagerCreateTaskScreen = (props) => {
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

    const [title, setTitle] = useState("");
    const [desc, setDescription] = useState("");
    const [member, setMember] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [dueTime, setDueTime] = useState("");
    const [priority, setPriority] = useState("");
    const [CreateStatus, setCreateStatus] = useState("");
    const [memberList, setMemberList] = useState([]);

    //function to make an object and send data to backend
    const Create = () => {
        console.log(id);
        Axios.post("http://localhost:3001/task/create", {
            //pass data received from input to backend
            ID: id,
            title: title,
            desc: desc,
            member: member,
            dueDate: dueDate,
            dueTime: dueTime,
            priority: priority,
        }).then((response) => {
            if (response.data.createSuccess) {
                console.log(response);
                props.history.push("/manager-task");
            } else {
                setCreateStatus(response.data.message);
            }
        });
    };

    // function to fetch the data from database
    const getTeamData = async () => {
        try {
            Axios.get("http://localhost:3001/task/members", {
                params: { id: id }
            }).then((response) => {
                console.log(response.data);
                setMemberList(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // React Hook that executes the fetch function on the first render 
    useEffect(() => {
        getTeamData();
    }, []);

    const CreateHandler = (event) => {
        event.preventDefault(); //to prevent the page gets reloaded when we click on the submit button, so that it does not send any data to the server
    };

    var timer = new Date();
    var today = moment().format('YYYY-MM-DD');
    const [ClockInStatus, setClockInStatus] = useState("");
    const [ClockOutStatus, setClockOutStatus] = useState("");

    function clickIn() {
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
                            <img src={close} alt="close" class="close-btn" name='side' />
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
                    <div id="modal" className="hidden">
                        <p>{ClockInStatus}</p>
                    </div>
                    <div id="modal-out" className="hidden">
                        <p>{ClockOutStatus}</p>
                    </div>
                    <form onSubmit={CreateHandler}>
                        <div className="table">
                            <label className="title">Create Task</label>
                            <br></br>
                            <br></br>
                            <label className="font">Task Title</label>
                            <br></br>
                            <input type="text" className="row" id="title"
                                onChange={(event) => setTitle(event.target.value)}></input>
                            <br></br>
                            <br></br>
                            <label className="font">Task Description</label>
                            <br></br>
                            <textarea className="text-area" rows="7" id="desc"
                                onChange={(event) => setDescription(event.target.value)}></textarea>
                            <br></br>

                            <label className="font">Members</label>
                            <label className="font-2">Priority</label>
                            <br></br>
                            <select className="members" id="member"
                                value={member}
                                onChange={e => setMember(e.target.value)}>
                                <option value="">- Select -</option>
                                {memberList.map((mem) => (
                                    console.log(mem.ID),
                                    <option value={mem.ID}>{mem.FName + " " + mem.LName}</option>
                                ))}
                            </select>
                            <select className="priority" id="priority"
                                value={priority}
                                onChange={e => setPriority(e.target.value)}>
                                <option value="">- Select -</option>
                                <option value="High">High</option>
                                <option value="Mid">Mid</option>
                                <option value="Low">Low</option>
                            </select>
                            <br></br>
                            <br></br>
                            <label className="font">Deadline</label>
                            <br></br>
                            <input type="date" className="date" id="dueDate"
                                onChange={(event) => setDueDate(event.target.value)} />
                            <input type="time" className="time" id="dueTime"
                                onChange={(event) => setDueTime(event.target.value)}></input>
                            <br></br>
                            <br></br>
                            <button onClick={Create} className="submit">
                                Submit
                            </button>
                            <h4 style={{ color: "red" }}>{CreateStatus}</h4>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default ManagerCreateTaskScreen;
