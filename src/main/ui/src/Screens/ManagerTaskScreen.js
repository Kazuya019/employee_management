import "./UserMainScreen.css";
import "./ManagerTaskScreen.css";
import { Link } from "react-router-dom";
import close from './images/close-sidebar.jpg';
import open from  './images/open-sidebar.jpg';

function UserMainScreen() {
    
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
                    <table className = "table">
                    <label className="title">Create Task</label>
                    <br></br>
                    <br></br>
                    <label className="font">Task Title</label>
                    <br></br>
                    <input type="text" className="row"></input>
                    <br></br>
                    <br></br>
                    <label className="font">Task Description</label>
                    <br></br>
                    <textarea className="text-area" rows="7"></textarea>
                    <br></br>
                
                    <label className="font">Members</label>
                    <br></br>
                    <select className="members">
                        <option value="">Abby Jia</option>
                        <option value="">Anna Li</option>
                        <option value="">Michelle Lu</option>
                        <option value="">Kazuya Nakashima</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label className="font">Deadline</label>
                    <br></br>
                    <input type="date" className="date"/>
                    <input type="time" className="time"></input>
                    <br></br>
                    <br></br>
                    <button className="submit">
                            Submit
                    </button>
                    </table>
                </div>
            
            </div>
        </div>
        
    );
}

export default UserMainScreen;
