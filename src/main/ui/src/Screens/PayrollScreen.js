import React, { useState, useEffect } from "react";
import "./PayrollScreen.css";
import "./UserMainScreen.css";
import moment from "moment";
import close from "./images/close-sidebar.jpg";
import open from "./images/open-sidebar.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";

// the hours for today will only be populated once the clock out button is pushed
function PayrollScreen() {
    var pos = localStorage.getItem("Position");
    var cIn = localStorage.getItem("Clock in");
    var cOut = localStorage.getItem("Clock out");
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

    function getLastWeekDates() {
        var weekDates = [];
        for (var i = -6; i <= -2; i++) {
            weekDates.push(moment().day(i).format('YYYY-MM-DD'));
        }
        return weekDates;
    }

    function getThisWeekDates() {
        var weekDates = [];
        for (var i = 1; i <= 5; i++) {
            weekDates.push(moment().day(i).format('YYYY-MM-DD'));
        }
        return weekDates;
    }

    var lastWeekDates = getLastWeekDates();
    var thisWeekDates = getThisWeekDates();
    const [prevDaysTime, setPrevDaysTime] = useState([]);
    const [salary, setSalary] = useState("");

    //function to update previous days
    const DaysBefore = () => {
        try {
            Axios.get("http://localhost:3001/payroll/days-before", {
                //pass data received from input to backend
                params: {
                    employee_id: id,
                    today: moment().format('YYYY-MM-DD')
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    // function to fetch previous days
    const getPrevDaysData = async () => {
        try {
            Axios.get("http://localhost:3001/payroll/prev-day", {
                params: {
                    id: id,
                    startDate: lastWeekDates[0],
                    endDate: thisWeekDates[4]
                }
            }).then((response) => {
                console.log(response.data);
                setPrevDaysTime(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // function to fetch salary
    const getSalary = async () => {
        try {
            Axios.get("http://localhost:3001/payroll/salary", {
                params: { id: id }
            }).then((response) => {
                console.log(response.data);
                setSalary(response.data.salary);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // React Hook that executes the fetch functions on the first render 
    useEffect(() => {
        getPrevDaysData();
        DaysBefore();
        getSalary();
    }, []);

    var retrieved = {};
    var days = [];
    prevDaysTime.map((prev) => (
        retrieved[(moment(prev.day).format('YYYY-MM-DD'))] = prev.hours,
        days.push((moment(prev.day).format('YYYY-MM-DD')))
    ));

    function getHours() {
        var hours = [];
        var index = 0;
        for (var i = 0; i < 10; i++) {
            if (i < 5) {
                if (lastWeekDates[i] === days[index]) {
                    hours.push(retrieved[days[index]]);
                    index++;
                } else {
                    hours.push('-');
                }
            } else {
                if (thisWeekDates[i - 5] === days[index]) {
                    hours.push(retrieved[days[index]]);
                    index++;
                } else {
                    hours.push('-');
                }
            }
        }
        return hours;
    }

    var hours = getHours();
    var lastWeekHours = hours.slice(0, 5);
    var thisWeekHours = hours.slice(5);

    const lastWeekStart = moment().day(-6).format("M/D")
    const lastWeekEnd = moment().day(-2).format("M/D")
    const thisWeekStart = moment().day(1).format("M/D")
    const thisWeekEnd = moment().day(5).format("M/D")
    const payDay = moment().day(5).format("MM/DD/YYYY")

    var timer = new Date();
    const [ClockInStatus, setClockInStatus] = useState("");
    const [ClockOutStatus, setClockOutStatus] = useState("");
    var today = moment().format('YYYY-MM-DD');

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
                                {pos === 'Manager' || pos === 'Director' || pos === 'CEO' ?
                                    <Link to="/manager-task" type="button" className="btn" name="button">
                                        My tasks
                                    </Link> : <Link to="/task" type="button" className="btn" name="button">
                                        My tasks
                                    </Link>
                                }
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
                    <div class="timecard">
                        <div class="section-title"><h3>Timecard</h3></div>
                        <hr></hr>
                        <div class="section-title" id="week1">
                            <p>Week of {lastWeekStart} - {lastWeekEnd}</p>
                        </div>
                        <div class="timecard">
                            <table class="tc-table">
                                <tr>
                                    <th>Date</th>
                                    {lastWeekDates.map((lwd) => (
                                        <td>{moment(lwd).format("ddd, M/D")}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Hours</th>
                                    {lastWeekHours.map((lwh) => (
                                        <td>{lwh}</td>
                                    ))}
                                </tr>
                            </table>
                        </div>

                        <div class="section-title" id="week2">
                            <p>Week of {thisWeekStart} - {thisWeekEnd}</p>
                        </div>
                        <div class="timecard">
                            <table class="tc-table">
                                <tr>
                                    <th>Date</th>
                                    {thisWeekDates.map((twd) => (
                                        <td>{moment(twd).format("ddd, M/D")}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Hours</th>
                                    {thisWeekHours.map((twh) => (
                                        <td>{twh}</td>
                                    ))}
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="pay-details">
                        <div class="section-title">
                            <h3>Pay Details</h3>
                        </div>
                        <hr></hr>
                        <table class="pd-table">
                            <tr>
                                <th>Salary/Base Pay</th>
                                <th>Next Payday</th>
                            </tr>
                            <tr>
                                <td>${salary}</td>
                                <td>{payDay}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayrollScreen;