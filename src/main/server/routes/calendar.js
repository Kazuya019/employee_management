const express = require("express");
const router = express.Router();

const db = require("../config/db");

const moment = require('moment-holiday');


// get any task calendar information based on date chosen
router.post("/calendar-task-info", (req, res) => {
    const id = Number(req.body.ID);
    const date = req.body.date;
    db.query("SELECT title, due_time FROM tasks WHERE due_date=? AND (employee_id=? OR manager_id=?)", [date, id, id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log('Query result: ', result);
            res.json({
                contents: result,
            });
        }
        else {
            res.json({
                contents: [],
            });
        }
    });
});


// get any holiday calendar information based on date chosen
router.post("/calendar-hol-info", (req, res) => {
    const date = req.body.date;
    console.log(date);
    var holiday = moment(date).isHoliday();
    if (holiday === 'false') {
        res.json({
            contents: ''
        });
    } else {
        res.json({
            contents: holiday
        });
    }
});

module.exports = router;
