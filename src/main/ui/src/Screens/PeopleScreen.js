import React, { useEffect } from "react";
import "./UserMainScreen.css";
import "./PeopleScreen.css";
import { Link } from "react-router-dom";
import close from './images/close-sidebar.jpg';
import open from './images/open-sidebar.jpg';
import { useState } from "react";
import Axios from "axios";
import moment from "moment";


function UserMainScreen() {
    const [info, setInfo] = useState([]);
    var id = localStorage.getItem("ID");
    var pos = localStorage.getItem("Position");
    var today = moment().format('YYYY-MM-DD');

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

    const [view, setView] = useState("");
    const [pInfo, setPInfo] = useState([]);

    useEffect(() => {
        const fetchPosDep = async () => {
            try {
                const res = await Axios.get("http://localhost:3001/people", {});
                setInfo(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchPosDep();
    }, []);


    const Filter = () => {
        console.log(view);
        Axios.post("http://localhost:3001/people/special", {
            //pass data received from input to backend
            ID: id,
            type: view
        }).then((response) => {
            setPInfo(response.data);
        });
    };

    const FilterHandler = (event) => {
        event.preventDefault(); //to prevent the page gets reloaded when we click on the submit button, so that it does not send any data to the server
    };


    var timer = new Date();
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
        <div className="grid-container" >
            <div className="hidden" id="modal-overlay"></div>
            <header className="header">
                <div className="title">
                    Connecteam+
                </div>
                <div className="clockin-out">
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
            <div className="container" >
                <aside className="side-bar" id="side-menu">
                    <div>
                        <button className="sidebar-close-button" onClick={btnClick}>
                            <img src={close} alt="close" className="close-btn" name='side' />
                        </button>
                    </div>
                    <div id="side" className="side">
                        <ul className="side-buttons">
                            <li>
                                <Link to="/main" type="button" className="btn" name="button">
                                    Home
                                </Link>
                            </li>
                            <li>
                                {pos === 'Manager' || pos === 'Director' || pos === 'CEO' ?
                                    <Link to="/manager-task" type="button" className="btn" name="button">
                                        My tasks
                                    </Link> : <Link to="/task" type="button" className="btn" name="button">
                                        My tasks
                                    </Link>
                                }
                            </li>
                            <li>
                                <Link to="/calendar" type="button" className="btn" name="button">
                                    Calendar
                                </Link>
                            </li>
                            <li>
                                <Link to="/message" type="button" className="btn" name="button">
                                    Messages
                                </Link>
                            </li>
                            <li>
                                <Link to="/payroll" type="button" className="btn" name="button">
                                    Payroll
                                </Link>
                            </li>
                            <li>
                                <Link to="/people" type="button" className="btn" name="button">
                                    People
                                </Link>
                            </li>
                        </ul>
                        <Link to="/signin" type="button" className="btn-underline">
                            <button className="logout">
                                Log out
                            </button>
                        </Link>

                    </div>
                </aside>

                <div className="main-contents">
                    <div id="modal" className="hidden">
                        <p>{ClockInStatus}</p>
                    </div>
                    <div id="modal-out" className="hidden">
                        <p>{ClockOutStatus}</p>
                    </div>
                    <div class='choice'>
                        <form onSubmit={FilterHandler}>
                            <label class='filter'>Filter</label>
                            <select className="sel-filter"
                                value={view}
                                onChange={e => setView(e.target.value)}>
                                <option value="">- Select -</option>
                                <option value="All">All</option>
                                <option value="Manager">Your Manager</option>
                                <option value="Team">Your Team</option>
                                {pos === 'Manager' || pos === 'Director' || pos === 'CEO' ?
                                    <option value="Emp">Your Subordinates</option> : <></>
                                }
                            </select>
                            <button onClick={Filter} className="submit-sel">
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className="table">
                        <table>
                            <tr className="title">
                                <th>Name</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Email</th>
                            </tr>
                            {pInfo.length == 0 ?
                                <>
                                    {info.map(detail => (
                                        <tr className="detail">
                                            <td>{detail.FName} {detail.LName}</td>
                                            <td>{detail.Position}</td>
                                            <td>{detail.Department}</td>
                                            <td>{detail.email}</td>
                                        </tr>
                                    ))}
                                </>
                                :
                                <>
                                    {pInfo.map(detail => (
                                        <tr className="detail">
                                            <td>{detail.FName} {detail.LName}</td>
                                            <td>{detail.Position}</td>
                                            <td>{detail.Department}</td>
                                            <td>{detail.email}</td>
                                        </tr>
                                    ))}
                                </>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserMainScreen;
