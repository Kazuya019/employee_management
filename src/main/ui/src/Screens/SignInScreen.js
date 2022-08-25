import { useState } from "react";
import "./SignInScreen.css";
import logo from "./images/left.png";
import logos from "./images/right.png";
function SigninScreen() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const SignInHandler = (event) => {
    event.preventDefault(); //to prevent the page gets reloaded when we click on the submit button, so that it does not send any data to the server
  };

  return (
    <div>
      <h1>Connecteam+</h1>
      <img className="left" src={logo} alt="Logo" />
      <img className="right" src={logos} alt="Logo" />
      <form onSubmit={SignInHandler}>
        <div className="SignInForm">
          <h1>Sign In</h1>
          <input
            type="text"
            placeholder="Employee ID"
            id="employee_id"
            onChange={(event) => setId(event.target.value)}
          ></input>
          <hr></hr>
          <input
            type="text"
            placeholder="Password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <hr></hr>
          <button type="submit" class="registerbtn">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
export default SigninScreen;
