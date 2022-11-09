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

//API will first write on the root address
// app.get("/", (req, res) => {
//   res.send("First request!!!!!!");
// });

//connect to server port
app.listen(3001, () => {
  console.log("running server");
});
