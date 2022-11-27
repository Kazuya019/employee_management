const express = require("express");
const router = express.Router();

const db = require("../config/db");

//create a route to insert a new user to the database
router.post("/register", (req, res) => {
  //   console.log(req.body);
  //get data from frontend
  const ID = req.body.ID;
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const email = req.body.email;
  const password = req.body.password;
  const comfPassword = req.body.comfPassword;

  if (ID === "") {
    res.json({
      registerSuccess: false,
      message: "Missing ID!",
    });
  } else if (Fname === "" || Lname === "") {
    res.json({
      registerSuccess: false,
      message: "Missing Name!",
    });
  } else if (email === "") {
    res.json({
      registerSuccess: false,
      message: "Missing Email!",
    });
  } else if (password === "") {
    res.json({
      registerSuccess: false,
      message: "Missing Password!",
    });
  } else if (password != comfPassword) {
    res.json({
      registerSuccess: false,
      message: "Passwords do not match!",
    });
  } else {
    db.query(
      "INSERT INTO employees (ID, Fname, Lname, email, password, comfPassword) VALUES (?,?,?,?,?,?)",
      [ID, Fname, Lname, email, password, comfPassword], //elements in the array represent the ?s
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ registerSuccess: true });
        }
      }
    );
  }
});

//send employee data to retrieve employee info
router.post("/login", (req, res) => {
  const ID = req.body.ID;
  const password = req.body.password;

  db.query(
    "SELECT * FROM employees WHERE ID = ?",
    [ID, password],
    (err, result) => {
      if (err) {
        // res.send({ err: err }); //send error to frontend if no match data in database
        console.log(err);
      }
      if (result.length > 0) {
        if (password == result[0].password) {
          console.log(result)
          res.json({ loggedIn: true, ID: ID, Position: result[0].Position });
        } else {
          res.json({
            loggedIn: false,
            message: "Wrong username/password combination!",
          });
        }
      } else {
        res.json({
          loggedIn: false,
          message: "User does not exist",
        });
      }
    }
  );
});

module.exports = router;
