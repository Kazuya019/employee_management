import React from "react";
import "./TaskInfoScreen.css";
import "./UserMainScreen.css";
import close from "./images/close-sidebar.jpg";
import open from  "./images/open-sidebar.jpg";
import { Link } from "react-router-dom";


function TaskInfoScreen() {
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
                        <table class="task-info-tbl">
                            <tr>
                                <td><div class="task-header">Sub Task 1</div></td>
                                <td rowspan="2"><button class="complete">Complete</button></td>
                            </tr>
                            <tr>
                                <td><div class="due-date">Due</div></td>
                            </tr>
                        </table>
                        <div class="info">
                            <ol>
                                <li>Information about task</li>    
                                <li>Information about task</li>   
                                <li>Information about task</li> 
                            </ol>
                        </div>
                        <div class="form-group">
                            <form method="get">
                                <input type="text" placeholder="Comments..."></input>
                                <button type="submit" class="comment">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TaskInfoScreen;