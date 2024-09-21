import express from "express";
import sqlite from "sqlite3";

const db = new sqlite.Database("schoolMgmt.db");

const router = express.Router();

router.get("/", (req, res) => {
  const getApplicationQuery = `SELECT * FROM form_details`;
  db.all(getApplicationQuery, (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    } else if (row) {
      return res.status(201).json({ message: "Data send", status: 201, row });
    }
  });
});

export { router as homeRouter };
