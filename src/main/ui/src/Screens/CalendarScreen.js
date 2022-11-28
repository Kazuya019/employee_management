import "./UserMainScreen.css";
import "./CalendarScreen.css";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import close from "./images/close-sidebar.jpg";
import open from "./images/open-sidebar.jpg";
import React, { useState } from "react";
import moment from "moment";
import { BsFillCaretRightFill } from "react-icons/bs";
import Axios from "axios";

function CalendarScreen() {
  var id = localStorage.getItem("ID");
  var pos = localStorage.getItem("Position");

  const [isAction, setIsAction] = useState(false);
  const [dateState, setDateState] = useState(new Date());
  const [cTaskInfo, setCalendarTaskInfo] = useState([]);
  const [cHolidayInfo, setCalendarHolidayInfo] = useState("");

  const changeDate = (e) => {
    setDateState(e);
    // get tasks due on the day
    Axios.post("http://localhost:3001/calendar/calendar-task-info", {
      ID: id,
      date: moment(e).format('YYYY-MM-DD')
    }).then((response) => {
      setCalendarTaskInfo(response.data.contents);
    });
    // get holidays on the day
    Axios.post("http://localhost:3001/calendar/calendar-hol-info", {
      ID: id,
      date: moment(e).format('YYYY-MM-DD')
    }).then((response) => {
      setCalendarHolidayInfo(response.data.contents);
    });
  };

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
        <div class="title">Connecteam+</div>
        <div class="clockin-out">
          <ul>
            <li>
              <button class="clock-btn">Clock in</button>
            </li>
            <li>
              <button class="clock-btn">Clock out</button>
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
                <Link to="/signin" type="button" class="btn" name="button">
                  Payroll
                </Link>
              </li>
            </ul>
            <Link to="/signin" type="button" class="btn-underline">
              <button class="logout">Log out</button>
            </Link>
          </div>
        </aside>

        <div class="main-contents">
          <Calendar value={dateState} onChange={changeDate} />
          <div className="" onClick={() => setIsAction(!isAction)}>
            <div>{isAction ? <BsFillCaretRightFill /> : ""}</div>
            <div class='schedule'>
              <p className="date-print">
                Current selected date is{" "}
                <b>{moment(dateState).format("MMMM Do YYYY")}</b>
              </p>
              {cTaskInfo.map((info) => (
                <p className="date-print">{info.title} due at {moment(info.due_time, "HH:mm:ss").format("hh:mm A")}</p>
              ))}
              <p className="date-print">{cHolidayInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarScreen;
