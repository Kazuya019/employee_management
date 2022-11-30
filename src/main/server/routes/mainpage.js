const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get('/', function (req, res, next) {
    var id = req.query.ID;

    var q = "SELECT ID, FName, LName, Position, Department FROM employees NATURAL JOIN company_info WHERE ID = ?"
    db.query(q, id, (err, data, fields) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});


// update clock-in record in db
router.post("/clock-in", (req, res) => {
    const ID = Number(req.body.employee_id);
    const date = req.body.date;
    const time = req.body.time;
    db.query("SELECT * FROM time_worked WHERE employee_id=? AND day=?", [ID, date], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            if (result[0].clock_in === '00:00:00') {
                db.query("UPDATE time_worked SET clock_in=? WHERE employee_id=? AND day=?", [time, ID, date], (err, result) => {
                    if (err) throw err;
                    res.json({
                        message: "Clock in Success",
                    });
                });
            } else {
                res.json({
                    message: "Unsuccessful Clock in - Identified Previous Clock in with no Clock out",
                });
            }
        } else {
            db.query("INSERT INTO time_worked VALUES (?,?,?,NULL,NULL)", [date, ID, time], (err, result) => {
                if (err) throw err;
                res.json({
                    message: "Clock in Success",
                });
            });
        }
    });
});


// update clock out record in db
router.post("/clock-out", (req, res) => {
    const ID = Number(req.body.employee_id);
    const date = req.body.date;
    const time = req.body.time;
    db.query("SELECT * FROM time_worked WHERE employee_id=? AND day=?", [ID, date], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.json({
                message: "Unsuccessful Clock out - Can't clock out before clock in",
            });
        } else {
            if (result[0].clock_in === '00:00:00') {
                res.json({
                    message: "Unsuccessful Clock out - Can't clock out before clock in",
                });
            } else {
                db.query("UPDATE time_worked SET clock_out=? WHERE employee_id=? AND day=?", [time, ID, date], (err, result) => {
                    if (err) throw err;
                    res.json({
                        message: "Clock out Success",
                    });
                });
                if (result[0].hours == null) {
                    db.query("UPDATE time_worked SET hours=(TIME_TO_SEC(clock_out) - TIME_TO_SEC(clock_in))/3600 WHERE employee_id=? AND day=?", [ID, date], (err, result) => {
                        if (err) throw err;
                    });
                } else {
                    db.query("UPDATE time_worked SET hours=? + (TIME_TO_SEC(clock_out) - TIME_TO_SEC(clock_in))/3600 WHERE employee_id=? AND day=?", [result[0].hours, ID, date], (err, result) => {
                        if (err) throw err;
                    });
                }
                db.query("UPDATE time_worked SET clock_in='0', clock_out='0' WHERE employee_id=? AND day=?", [ID, date], (err, result) => {
                    if (err) throw err;
                });
            }
        }
    })
});

module.exports = router;
