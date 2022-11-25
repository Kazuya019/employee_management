import React, { useEffect } from "react";
import "./UserMainScreen.css";
import { Link } from "react-router-dom";
import close from './images/close-sidebar.jpg';
import open from  './images/open-sidebar.jpg';
import {useState} from "react";
import { Suspense } from "react";
import axios from "axios";

function UserMainScreen() {
    const [info, setInfo] = useState([]);
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

    useEffect(() => {
        console.log("useEffect is used ??");
        const fetchPosDep = async ()=> {

            try {
                const res = await axios.get("http://localhost:3001/main", {
                    params: {
                        ID: id
                    }
                });
                setInfo(res.data);
                console.log("useEffect is used.");
            } catch (err) {
                console.log(err)
            }
        }
        fetchPosDep();
    },[ ]);

    function ProfileDetails() {
        const name = info[0].FName
        return <div className="user-icon"> Employee Name: {name} </div>
    }

    return (
        <div className="grid-container">
            <header className="header">
                <div className="title">
                    Connecteam+
                </div>
                <div className="clockin-out">
                    <ul>
                        <li>
                        <button className="clock-btn">
                            Clock in
                        </button>
                        </li>
                        <li>
                        <button className="clock-btn">
                            Clock out
                        </button>
                        </li>
                    </ul>
                </div>
                
            </header>
            <div className="container">
                <aside className="side-bar" id="side-menu">
                    <div>
                        <button className="sidebar-close-button" onClick={btnClick}>
                            <img src={close} alt="close" className="close-btn" name='side'/>
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
                                <Link to="/task" type="button" className="btn" name="button">
                                    My tasks
                                </Link>
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
                        </ul>
                        <Link to="/signin" type="button" className="btn-underline">
                            <button className="logout">
                                Log out
                            </button>
                        </Link>
                        
                    </div>
                </aside>

                <div className="main-contents">
                    {info.map(detail=>(
                        <div className="user-icon"> 
                            Employee Name: {detail.FName} {detail.LName}
                        </div>
                    ))}  
                    {info.map(detail=>(
                        <div className="user-info">
                            <ul>
                                <li>Employee ID: {detail.ID} </li>
                                <li>Department: {detail.Department} </li>
                                <li>Position: {detail.Position}</li>
                            </ul>
                        </div>
                    ))}
                    
                </div>
            
            </div>
        </div>
        
    );
}

export default UserMainScreen;
