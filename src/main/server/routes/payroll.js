const express = require("express");
const router = express.Router();

const db = require("../config/db");


// get the hours for each day for last week and this week
router.get('/prev-day', (req, res) => {
    const id = Number(req.query.id);
    const start = req.query.startDate;
    const end = req.query.endDate;
    db.query("SELECT day, hours FROM time_worked WHERE employee_id=? AND day >= ? AND day <= ?;",
        [id, start, end], (err, results) => {
            if (err) throw err;
            let result = Object.values(JSON.parse(JSON.stringify(results)));
            res.send(result);
            console.log(result);
    });
});


// update any days where the user forgot to clock out to have hours worked
router.get("/days-before", (req, res) => {
    const ID = Number(req.query.employee_id);
    const today = req.query.today;
    db.query("UPDATE time_worked SET hours=(TIME_TO_SEC('17:00') - TIME_TO_SEC(clock_in))/3600 WHERE hours IS NULL AND day < ? AND employee_id=?;",
        [today, ID], (err, result) => {
            if (err) throw err;
            console.log('Query result: ', result);
    })
});


// get the employee's salary
router.get("/salary", (req, res) => {
    const ID = Number(req.query.id);
    db.query("SELECT salary FROM company_info WHERE ID=?;", [ID], (err, result) => {
        if (err) throw err;
        res.json({ salary: result[0].salary });
    })
});


module.exports = router;
