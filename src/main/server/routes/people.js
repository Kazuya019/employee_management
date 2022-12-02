const express = require("express");
const router = express.Router();

const db = require("../config/db");

module.exports = router;

router.get('/', function (req, res, next) {
    var id = req.query.ID;

    var q = "SELECT FName, LName, Position, Department FROM employees NATURAL JOIN company_info ORDER BY LName"
    db.query(q, id, (err, data, fields) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});