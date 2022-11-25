const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get('/', function(req, res, next){
    var id = req.query.ID;

    var q = "SELECT ID, FName, LName, Position, Department FROM employees WHERE ID = ?"
    db.query(q, id, (err,data,fields)=> {
        if(err) return res.json(err)
        return res.json(data)
    })   
});

module.exports = router;
