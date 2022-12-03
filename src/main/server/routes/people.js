const express = require("express");
const router = express.Router();

const db = require("../config/db");

module.exports = router;

router.get('/', function (req, res, next) {
    var id = req.query.ID;
    var q = "SELECT FName, LName, Position, Department, email FROM employees NATURAL JOIN company_info ORDER BY Department, LName"
    db.query(q, id, (err, data, fields) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});


// get people details for people info page
router.post('/special', (req, res) => {
    const id = Number(req.body.ID);
    const type = req.body.type;
    console.log(id);
    console.log(type);
    if (type === 'All') {
        var q = "SELECT FName, LName, Position, Department, email FROM employees NATURAL JOIN company_info ORDER BY Department, LName"
        db.query(q, id, (err, results) => {
            if (err) return res.json(err)
            let result = Object.values(JSON.parse(JSON.stringify(results)));
            res.send(result);
            console.log(result);
        });
    } else if (type === 'Manager') {
        db.query("SELECT FName, LName, Position, Department, email FROM employees NATURAL JOIN company_info WHERE ID IN (SELECT manager FROM company_info WHERE ID=?);", [id], (err, results) => {
            if (err) throw err;
            let result = Object.values(JSON.parse(JSON.stringify(results)));
            res.send(result);
            console.log(result);
        });
    } else if (type === 'Team') {
        db.query("SELECT FName, LName, Position, Department, email FROM employees NATURAL JOIN company_info WHERE ID IN (SELECT manager FROM company_info WHERE ID=?) OR manager IN (SELECT manager FROM company_info WHERE ID=?) AND ID <> ? ORDER BY Lname;", [id, id, id], (err, results) => {
            if (err) throw err;
            let result = Object.values(JSON.parse(JSON.stringify(results)));
            res.send(result);
            console.log(result);
        });
    } else if (type === 'Emp') {
        db.query("SELECT FName, LName, Position, Department, email FROM employees NATURAL JOIN company_info WHERE ID IN (SELECT ID FROM company_info WHERE manager=?);", [id], (err, results) => {
            if (err) throw err;
            let result = Object.values(JSON.parse(JSON.stringify(results)));
            res.send(result);
            console.log(result);
        });
    }
});
