import express from "express";
import sqlite from "sqlite3";

const db = new sqlite.Database("schoolMgmt.db");

const router = express.Router();

router.post("/", (req, res) => {
  const { formData } = req.body;
  const {
    stdName,
    FatherName,
    dateOfBirth,
    gender,
    age,
    address,
    city,
    state,
    pincode,
    studentEmail,
    mobile,
  } = formData;

  const formSubmitQuery = `INSERT INTO form_details
  (student_name, father_name, date_of_birth, gender, age, address, city, state, pincode, student_email, mobile_no)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(
    formSubmitQuery,
    [
      stdName,
      FatherName,
      dateOfBirth,
      gender,
      age,
      address,
      city,
      state,
      pincode,
      studentEmail,
      mobile,
    ],
    (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server error", status: 500 });
      } else if (row) {
        return res
          .status(201)
          .json({ message: "Successfully added", status: 201 });
      }
    }
  );
});

export { router as formRouter };
