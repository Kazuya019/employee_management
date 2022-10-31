import React, { useState } from "react";
import "./PayrollScreen.css";
import "./UserMainScreen.css";
import moment from "moment";
import close from "./images/close-sidebar.jpg";
import open from  "./images/open-sidebar.jpg";
import { Link } from "react-router-dom";

const Timecard = ({ weeks, hours }) => {
    const [isActive] = useState(false);
    return (
        <div class = "timecard">
            <table class="tc-table">
                {weeks}
                {hours}
            </table>          
        </div>
    );
};

function PayrollScreen() {
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
        var weekDates= [];  
        for (var i = -6; i <= -2; i++) {
            weekDates.push(<td>{moment().day(i).format("ddd, M/D")}</td>); 
        }
        return weekDates; 
    }

    function getThisWeekDates() {
        var weekDates= []; 
        for (var i = 1; i <= 5; i++) {
            weekDates.push(<td>{moment().day(i).format("ddd, M/D")}</td>); 
        }
        return weekDates; 
    }

    var lastWeekDates = getLastWeekDates();   
    var thisWeekDates = getThisWeekDates(); 

    const n = 5;
    const hour = <td>hour</td>
    const hourRow = [...Array(n)].map((e, i) => hour)
    const lastWeekInfo = {
        weeks: 
            <tr>
                <th>Date</th>
                {lastWeekDates}
            </tr>,
        hours:  
            <tr>
                <th>Hours</th>
                {hourRow}
            </tr>     
    }
    const thisWeekInfo = {
        weeks: 
            <tr>
                <th>Date</th>
                {thisWeekDates}
            </tr>,
        hours:  
        <tr>
            <th>Hours</th>
            {hourRow}
        </tr>  
    }
   
    const lastWeekStart = moment().day(-6).format("M/D")
    const lastWeekEnd = moment().day(-2).format("M/D")
    const thisWeekStart = moment().day(1).format("M/D")
    const thisWeekEnd = moment().day(5).format("M/D")
    const lastWeek = [...Array(1)].map((e, i) => lastWeekInfo)
    const thisWeek = [...Array(1)].map((e, i) => thisWeekInfo)
    
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
                    <div class="timecard">
                        <div class="section-title"><h3>Timecard</h3></div>
                        <hr></hr>
                        <div class="section-title" id="week1">
                            <p>Week of {lastWeekStart} - {lastWeekEnd}</p>
                        </div>
                        {lastWeek.map(({ weeks, hours }) => (
                            <Timecard weeks={weeks} hours={hours} />
                        ))}
                        <div class="section-title" id="week2">
                            <p>Week of {thisWeekStart} - {thisWeekEnd}</p>
                        </div>
                        {thisWeek.map(({ weeks, hours }) => (
                            <Timecard weeks={weeks} hours={hours} />
                        ))}
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
                                <th>PTO Available</th>
                            </tr>
                            <tr>  
                                <td>$</td>
                                <td>day</td>
                                <td>hours</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PayrollScreen;