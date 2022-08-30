import React from "react";
import "./UserMainScreen.css";
import SigninScreen from "./SignInScreen";
import { Link } from "react-router-dom";

function UserMainScreen() {
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
                    
                    <div class="user-icon">
                        Employee Name
                    </div>
                    <div class="user-info">
                        <ul>
                            <li>Employee ID</li>
                            <li>Department</li>
                            <li>Position</li>
                        </ul>
                    </div>
                </div>
            
            </div>
            <footer>
                Contact
            </footer>
        </div>
        
    );
}

export default UserMainScreen;