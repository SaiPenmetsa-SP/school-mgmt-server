import express from "express";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("schoolMgmt.db");

const router = express.Router();

router.post("/", (req, res) => {
  const { role } = req.body;
  const { roleName, name } = role;
  console.log(roleName, name);
  const checkRoleQuery = `SELECT * FROM user WHERE user_role=? AND user_name=?`;

  db.get(checkRoleQuery, [roleName, name], (err, row) => {
    console.log(row);

    if (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong", status: 500 });
    } else if (row) {
      return res.status(200).json({ message: "Already exist", status: 200 });
    } else {
      const insertQuery = `INSERT INTO user (user_role,user_name) VALUES(?,?)`;
      db.run(insertQuery, [roleName, name], (err) => {
        if (err) {
          return res.status(500).json({ message: "Fail to Add!", status: 500 });
        } else {
          return res
            .status(201)
            .json({ message: "Added Successfully!", status: 201 });
        }
      });
    }
  });
});

export { router as rolesRouter };
