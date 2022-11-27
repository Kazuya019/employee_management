import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import UserMainScreen from "./Screens/UserMainScreen";
import TaskScreen from "./Screens/TaskScreen";
import TaskInfoScreen from "./Screens/TaskInfoScreen";
import SigninScreen from "./Screens/SignInScreen";
import UserMessageScreen from "./Screens/UserMessageScreen";
import CalendarScreen from "./Screens/CalendarScreen";
import PayrollScreen from "./Screens/PayrollScreen";
import ManagerTaskScreen from "./Screens/ManagerTaskScreen";
import ManagerCreateTaskScreen from "./Screens/ManagerCreateTaskScreen";
import ManagerTaskInfoScreen from "./Screens/ManagerTaskInfoScreen";


function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={HomeScreen}></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/main" component={UserMainScreen}></Route>
      <Route path="/message" component={UserMessageScreen}></Route>
      <Route path="/task" component={TaskScreen}></Route>
      <Route path="/task-info" component={TaskInfoScreen}></Route>
      <Route path="/calendar" component={CalendarScreen}></Route>
      <Route path="/payroll" component={PayrollScreen}></Route>
      <Route path="/manager-task" component={ManagerTaskScreen}></Route>
      <Route path="/manager-create-task" component={ManagerCreateTaskScreen}></Route>
      <Route path="/manager-task-info" component={ManagerTaskInfoScreen}></Route>
    </BrowserRouter>
  );
}

export default App;
