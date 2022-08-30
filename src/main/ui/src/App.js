import "./App.css";
import "./index.css";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import UserMainScreen from "./Screens/UserMainScreen";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SigninScreen from "./Screens/SignInScreen";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={HomeScreen}></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/userMain" component={UserMainScreen}></Route>
    </BrowserRouter>
  );
}

export default App;
