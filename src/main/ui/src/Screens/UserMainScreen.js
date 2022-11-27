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
    var pos = localStorage.getItem("Position");

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
        const fetchPosDep = async ()=> {

            try {
                const res = await axios.get("http://localhost:3001/main", {
                    params: {
                        ID: id
                    }
                });
                setInfo(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchPosDep();
    },[ ]);

    var timer = new Date();
    
    function clickIn() {
    
        const mask = document.getElementById("modal-overlay");
        const modal = document.getElementById("modal");

        mask.classList.remove("hidden");
        modal.classList.remove('hidden');

        localStorage.setItem("Clock in", timer.getHours())

        mask.addEventListener('click', () => {
            mask.classList.add('hidden');
            modal.classList.add('hidden');
        });
    }

    function clickOut() {
        const mask = document.getElementById("modal-overlay");
        const modal = document.getElementById("modal-out");

        mask.classList.remove("hidden");
        modal.classList.remove('hidden');

        localStorage.setItem("Clock out", timer.getHours())


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
                        <p>Clock in Success</p>
                    </div>
                    <div id="modal-out" className="hidden">
                        <p>Clock Out Success</p>
                    </div>
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
