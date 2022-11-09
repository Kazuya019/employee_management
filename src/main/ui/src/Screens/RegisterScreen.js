import React, { useState } from "react";
import "./RegisterScreen.css";
import logo from "./images/left.png";
import logos from "./images/right.png";
import Axios from "axios";

const RegisterScreen = (props) => {
  const [id, setId] = useState("");
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfPassword, setComfPassword] = useState("");

  //function to make an object and send data to backend
  const Register = () => {
    console.log(id);
    Axios.post("http://localhost:3001/user/register", {
      //pass data received from input to backend
      ID: id,
      Fname: Fname,
      Lname: Lname,
      email: email,
      password: password,
      comfPassword: comfPassword,
    }).then((response) => {
      console.log(response);
      props.history.push("/signin");
    });
  };

  const RegisterHandler = (event) => {
    event.preventDefault(); //to prevent the page gets reloaded when we click on the submit button, so that it does not send any data to the server
  };
  return (
    <div>
      <h1>Connecteam+</h1>
      <img className="left" src={logo} alt="Logo" />
      <img className="right" src={logos} alt="Logo" />
      <form onSubmit={RegisterHandler}>
        <div className="RegisterForm">
          <h1>Register</h1>
          <input
            type="text"
            placeholder="Employee ID"
            id="employee_id"
            onChange={(event) => setId(event.target.value)}
          ></input>
          <hr></hr>
          <input
            type="text"
            placeholder="First Name"
            id="Fname"
            onChange={(event) => setFName(event.target.value)}
          ></input>
          <hr></hr>
          <input
            type="text"
            placeholder="Last Name"
            id="Lname"
            onChange={(event) => setLName(event.target.value)}
          ></input>
          <hr></hr>
          <input
            type="text"
            placeholder="Email Address"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <hr></hr>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <hr></hr>
          <input
            type="password"
            placeholder="Confirm Password"
            id="comfPassword"
            onChange={(event) => setComfPassword(event.target.value)}
          ></input>
          <hr></hr>
          <button onClick={Register} type="submit" className="registerbtn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
