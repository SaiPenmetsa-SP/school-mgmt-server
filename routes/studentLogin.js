import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

const db = new sqlite3.Database("schoolMgmt.db");

const userCredentials = express.Router();
const userName = express.Router();

userName.post("/", (req, res) => {
  const { userName } = req.body;

  //   console.log(userName);
  const checkUserNameQuery = `SELECT * from user WHERE user_name=?`;
  db.get(checkUserNameQuery, [userName], (err, row) => {
    // console.log(row);
    if (err) {
      return res
        .status(500)
        .json({ message: "Some thing happen", status: 500 });
    }
    if (row) {
      return res.status(201).json({ message: "user exist", status: 201 });
    }
  });
});

userCredentials.post("/", async (req, res) => {
  const { userCredentials } = req.body;

  const { name, password } = userCredentials;
  const getUserIdQuery = `SELECT * FROM user WHERE user_name=?`;
  db.get(getUserIdQuery, [name], async (err, row) => {
    // console.log(row);
    if (err) {
      return res.status(500).json({ message: "bad", status: 500 });
    } else if (row) {
      // console.log("row", row);
      // console.log(row.user_name === name);
      const getUserExistQuery = `SELECT * FROM user_details WHERE user_name=?`;
      db.get(getUserExistQuery, [name], async (err, rows) => {
        // console.log(rows, "rows");
        if (err) {
          return res.status(500).json({ message: "bad", status: 500 });
        }
        if (rows) {
          return res.status(200).json({ message: "User Existed", status: 200 });
        } else {
          const insertUserCredentials = `INSERT INTO user_details (user_name,user_password,user_id) VALUES(?,?,?)`;
          const hashedPassword = await bcrypt.hash(password, 10);
          db.run(insertUserCredentials, [name, hashedPassword, row.id]);
          return res
            .status(201)
            .json({ message: "User Added Successfully!", status: 201 });
        }
      });
    }
  });
});

export { userName, userCredentials };
