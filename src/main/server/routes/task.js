const express = require("express");
const router = express.Router();

const db = require("../config/db");


// get task info for task list
router.get('/task', (req, res) => {
  const id = Number(req.query.id);
  db.query("SELECT task_id, employee_id, title, due_date, priority, status FROM tasks WHERE employee_id=?;", [id], (err, results) => {
    if (err) throw err;
    let result = Object.values(JSON.parse(JSON.stringify(results)));
    res.send(result);
    console.log(result);
  });
});


// get task details for task info page
router.get('/task-info', (req, res) => {
  if (req.query.type === 'info') {
    const id = Number(req.query.id);
    const task = Number(req.query.task);
    if (req.query.extratype === 'own') {
      db.query("SELECT * FROM tasks WHERE employee_id=? AND task_id=?;", [id, task], (err, results) => {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results)));
        res.send(result);
        console.log(result);
      });
    } else {
      db.query("SELECT * FROM tasks JOIN employees ON ID=employee_id WHERE manager_id=? AND task_id=?;", [id, task], (err, results) => {
        if (err) throw err;
        let result = Object.values(JSON.parse(JSON.stringify(results)));
        res.send(result);
        console.log(result);
      });
    }
  } else {
    const id = Number(req.query.id);
    const task = Number(req.query.task);
    db.query("SELECT * FROM employees JOIN task_comments ON ID=employee_id WHERE task_id=?;", [task], (err, results) => {
      if (err) throw err;
      let result = Object.values(JSON.parse(JSON.stringify(results)));
      res.send(result);
      console.log(result);
    });
  }
});


// update completion status / insert new comments into db
router.post("/task-info", (req, res) => {
  if (req.body.type === 'comment') {
    const ID = Number(req.body.employee_id);
    const task = Number(req.body.task_id);
    const comment = req.body.comment_content;
    db.query("SELECT COUNT(*) AS 'num' FROM task_comments", (err, result) => {
      if (err) throw err;
      console.log('Query result: ', result);
      const comment_id = Number(result[0].num) + 1;
      db.query(
        "INSERT INTO task_comments (comment_id, employee_id, task_id, comment) VALUES (?,?,?,?)",
        [comment_id, ID, task, comment], //elements in the array represent the ?s
        (err, result) => {
          if (err) {
            console.log(err);
            res.json({
              commentSuccess: false,
              message: "Comment was not saved!",
            });
          } else {
            res.json({ commentSuccess: true });
          }
        }
      );
    });
  } else {
    const ID = Number(req.body.employee_id);
    const task = Number(req.body.task_id);
    db.query("UPDATE tasks SET status='complete' WHERE employee_id=? AND task_id=?", [ID, task], (err, results) => {
      if (err) {
        console.log(err);
        res.json({
          completeSuccess: false,
          message: "Completion not saved!",
        });
      } else {
        res.json({ completeSuccess: true });
      }
    });
  }
});


// get the tasks that the manager user assigned to others
router.get('/manager-task', (req, res) => {
  const id = Number(req.query.id);
  db.query("SELECT task_id, employee_id, title, due_date, priority, status FROM tasks WHERE manager_id=?;", [id], (err, results) => {
    if (err) throw err;
    let result = Object.values(JSON.parse(JSON.stringify(results)));
    res.send(result);
    console.log(result);
  });
});


// insert new created task into db
router.post("/create", (req, res) => {
  const ID = req.body.ID;
  const title = req.body.title;
  const desc = req.body.desc;
  const member = req.body.member;
  const dueDate = req.body.dueDate;
  const dueTime = req.body.dueTime;
  const priority = req.body.priority;
  console.log(ID, title, desc, member, dueDate, dueTime, priority);

  if (title === "" || desc === '' || member === '' || dueDate === '' || dueTime === '' || priority === '') {
    res.json({
      createSuccess: false,
      message: "Missing Fields!",
    });
  } else {
    console.log(ID, title, desc, member, dueDate, dueTime, priority);
    db.query("SELECT COUNT(*) AS 'num' FROM tasks", (err, result) => {
      if (err) throw err;
      console.log('Query result: ', result);
      const task_id = Number(result[0].num) + 1;
      db.query(
        "INSERT INTO tasks (task_id, manager_id, employee_id, title, description, due_date, due_time, priority, status) VALUES (?,?,?,?,?,?,?,?,?)",
        [task_id, ID, member, title, desc, dueDate, dueTime, priority, 'in progress'], //elements in the array represent the ?s
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ createSuccess: true });
          }
        }
      );
    });
  }
});


// get the members the manager can assign the new task to
router.get('/members', (req, res) => {
  const id = Number(req.query.id);
  db.query("SELECT * FROM employees JOIN company_info ON employees.ID=company_info.ID WHERE manager=?;", [id], (err, results) => {
    if (err) throw err;
    let result = Object.values(JSON.parse(JSON.stringify(results)));
    res.send(result);
    console.log(result);
  });
});


module.exports = router;
