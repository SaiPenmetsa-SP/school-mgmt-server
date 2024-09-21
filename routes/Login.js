import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = new sqlite3.Database("schoolMgmt.db");

const loginRouter = express.Router();

loginRouter.post("/", (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  const getUserNamePasswordQuery = `SELECT * FROM user_details WHERE user_name=?`;

  db.get(getUserNamePasswordQuery, [username], async (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    } else if (row) {
      console.log(row);
      if (row.user_name === username) {
        const passwordCompare = await bcrypt.compare(
          password,
          row.user_password
        );
        if (passwordCompare) {
          const getRole = `SELECT * FROM user WHERE user_name=?`;
          db.get(getRole, [username], (err, rowRole) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Internal Server Error", status: 500 });
            }
            if (rowRole) {
              const tokens = jwt.sign(
                {
                  id: row.id,
                  username: row.user_name,
                  role: rowRole.user_role,
                },
                "your_secret_key",
                { expiresIn: "1h" }
              );
              return res
                .status(201)
                .json({ message: "Login Success", status: 201, data: tokens });
            }
          });
        } else {
          return res
            .status(200)
            .json({ message: "password didn't match", status: 200 });
        }
      }
    }
  });
});

export { loginRouter };
