import React, { useState } from "react";
import "./RegisterScreen.css";
import logo from "./images/left.png";
import logos from "./images/right.png";

const RegisterScreen = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

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
            placeholder="Name"
            id="name"
            onChange={(event) => setName(event.target.value)}
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
            type="text"
            placeholder="Password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <hr></hr>
          <input
            type="text"
            placeholder="Confirm Password"
            id="employee_id"
            onChange={(event) => setRePassword(event.target.value)}
          ></input>
          <hr></hr>
          <button type="submit" class="registerbtn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
