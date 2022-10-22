import React from "react";
import "./UserMessageScreen.css";
import "./UserMainScreen.css";
import { Link } from "react-router-dom";
import close from './images/close-sidebar.jpg';
import open from  './images/open-sidebar.jpg';

function UserMessageScreen() {
    
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
                            <img src={close} alt="close" class="close-btn" name='side'/>
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
                                <Link to="/message" type="button" class="btn" name="button">
                                    Messages
                                </Link>
                            </li>
                            <li>
                                <Link to="/signin" type="button" class="btn" name="button">
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
                
                <div class="main-contents-message">
                    <h1>Compose Message</h1>
                    <hr></hr>
                    <div class="message-form">
                        <form method="" action="">
                            <table>
                                <tr>
                                    <th>Department:</th>
                                    <td><input type="text" size="30"></input></td>
                                </tr>
			                    <tr>
                                    <th>Email:</th>
                                    <td><input type="email" size="30"></input></td>
                                </tr>
                            </table>
                            <hr></hr>
                            <div class="text-area">
                                <textarea rows="10"></textarea>
                            </div>
                            <div class="submit">
                            <input class="submit-btn" type="submit" value="Submit"></input>
                            </div>
                        </form>
                    </div>
                    
                    
                </div>
            
            </div>
        </div>
        
    );
}

export default UserMessageScreen;