//get express
const express = require("express");

// //get the application from express (an object)
const app = express();

const cors = require("cors");
//allow to send inf from frontend and backend
app.use(cors());
app.use(express.json());

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const mainpageRoute = require("./routes/mainpage");
app.use("/main", mainpageRoute);

const taskRoute = require("./routes/task");
app.use("/task", taskRoute);

const calendarRoute = require("./routes/calendar");
app.use("/calendar", calendarRoute);

const payrollRoute = require("./routes/payroll");
app.use("/payroll", payrollRoute);

const peopleRoute = require("./routes/people");
app.use("/people", peopleRoute);

//API will first write on the root address
// app.get("/", (req, res) => {
//   res.send("First request!!!!!!");
// });


//connect to server port
app.listen(3001, () => {
  console.log("running server");
});
