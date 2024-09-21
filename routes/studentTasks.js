import express from "express";
import sqlite from "sqlite3";

const db = new sqlite.Database("schoolMgmt.db");

const routerTaskPost = express.Router();
const routerTaskGet = express.Router();
const studentForm = express.Router();

routerTaskPost.post("/", (req, res) => {
  const { task, details } = req.body;

  // console.log(task, "task");
  // console.log(details, "role");

  // tasks,name,role,id
  const insertTaskQuery = `INSERT INTO student_tasks(tasks,student_name,role,student_id)
        VALUES (?,?,?,?)`;

  db.run(
    insertTaskQuery,
    [task, details.name, details.role, details.id],
    (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", status: 500 });
      }
      if (row) {
        return res
          .status(201)
          .json({ message: "Added Successfully!", status: 201, row: row });
      }
    }
  );
});

studentForm.get("/formData/:ids", (req, res) => {
  // const { id } = req.params.id;
  const ids = req.params.ids;
  console.log(ids);

  const getStudentQuery = `SELECT * FROM  form_details WHERE id=?`;
  db.all(getStudentQuery, [ids], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    } else if (row) {
      return res
        .status(201)
        .json({ message: "Sent Successfully!", status: 201, row });
    }
  });
});

routerTaskGet.get("/user/:id", (req, res) => {
  const user = req.params.id;
  console.log(user);
  const getTasksQuery = `SELECt id,tasks FROM student_tasks WHERE student_name=?`;

  db.all(getTasksQuery, [user], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    } else if (row) {
      // console.log(row.length)
      if (row.length === 0) {
        return res.status(404).json({ message: "No Tasks Found", status: 404 });
      } else {
        return res.status(200).json({ message: "Success", status: 201, row });
      }
    }
  });
});

export { routerTaskPost as taskPost };
export { routerTaskGet as taskGet };

export { studentForm as studentF };
