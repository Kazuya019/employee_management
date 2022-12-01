import React, {useState}from "react";
import "./UserMessageScreen.css";
import "./UserMainScreen.css";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from "react-router-dom";
import close from './images/close-sidebar.jpg';
import open from  './images/open-sidebar.jpg';
import Axios from "axios";
import moment from "moment";

function UserMessageScreen() {
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
	
	const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_44o8ofq', 'template_004y4o4', form.current, 'NtFouw2ad6pi8Rubb')
            .then((result) => {
                console.log(result.text);
                console.log("message send");
            }, (error) => {
                console.log(error.text);
            });
    };

    var timer = new Date();
    const [ClockInStatus, setClockInStatus] = useState("");
    const [ClockOutStatus, setClockOutStatus] = useState("");
    var today = moment().format('YYYY-MM-DD');
    var id = localStorage.getItem("ID");

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
                
                <div class="main-contents-message">
                    <div id="modal" className="hidden">
                        <p>{ClockInStatus}</p>
                    </div>
                    <div id="modal-out" className="hidden">
                        <p>{ClockOutStatus}</p>
                    </div>
                    <h1>Compose Message</h1>
                    <hr></hr>
                    <div class="message-form">
                        <form ref={form} onSubmit={sendEmail}>
                            <label>Name</label>
                            <input type="text" size="30" name="user_name" />
                            <br/>
                            <br/>
                            <label>Email</label>
                            <input type="email" size="30" name="user_email" />
                            <br/>
                            <br/>
                            <label className="mess">Message</label>
                            <br/>
                            <textarea className="mes" name="message" rows="10"/>
                            <br/>
			    <Popup trigger={<input className="send" type="submit" value="Send"/>} position="right center">
                                <div>Successful send!</div>
                            </Popup>
                        </form>
                    </div>
                    
                    
                </div>
            
            </div>
        </div>
        
    );
}

export default UserMessageScreen;
