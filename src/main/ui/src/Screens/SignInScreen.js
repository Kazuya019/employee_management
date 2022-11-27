import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignInScreen.css";
import logo from "./images/left.png";
import logos from "./images/right.png";
import Axios from "axios";

function SigninScreen(props) {
  // const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState("");

  // useEffect(() => {
  //   return () => {};
  // }, []);

  //function to retrieve data from backend
  const Login = () => {
    // const history = useHistory();
    Axios.post("http://localhost:3001/user/login", {
      ID: id,
      password: password,
    }).then((response) => {
      // console.log(response.data);
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("ID", response.data.ID);
        localStorage.setItem("Position", response.data.Position);
        props.history.push("/main");
        // setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data.message);
      }
      // console.log(response);
    });
  };

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
            type="password"
            placeholder="Password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <hr></hr>
          <button onClick={Login} type="submit" className="registerbtn">
            Log In
          </button>
          <h4 style={{ color: "red" }}>{LoginStatus}</h4>
        </div>
      </form>
    </div>
  );
}
export default SigninScreen;
