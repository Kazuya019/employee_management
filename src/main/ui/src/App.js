import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import UserMainScreen from "./Screens/UserMainScreen";
import TaskScreen from "./Screens/TaskScreen";
import SigninScreen from "./Screens/SignInScreen";
import UserMessageScreen from "./Screens/UserMessageScreen";
import CalendarScreen from "./Screens/CalendarScreen";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={HomeScreen}></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/main" component={UserMainScreen}></Route>
      <Route path="/message" component={UserMessageScreen}></Route>
      <Route path="/task" component={TaskScreen}></Route>
      <Route path="/calendar" component={CalendarScreen}></Route>
    </BrowserRouter>
  );
}

export default App;
