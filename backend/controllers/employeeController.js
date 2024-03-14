const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "supermarket",
});

//GET
router.get("/", (req, res) => {
  connection.query("SELECT * FROM `employee`", (err, results, fields) => {
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `employee` WHERE `employee_id` = ?",
    [id],
    (err, results) => {
      res.json(results);
    }
  );
});

router.post("/login", (req, res) => {
  console.log(req);
  connection.query(
    "SELECT * FROM `employee` WHERE `password` = ?",
    [req.body.password],
    (err, results, fields) => {
      res.json(results);
    }
  );
});

//CREATE
router.post("/", (req, res) => {
  connection.query(
    "INSERT INTO `employee`(`name`, `tel`, `address`,`salary`) VALUES (?, ?, ?, ?)",
    [req.body.name, req.body.tel, req.body.addres, req.body.salary],
    (err, results) => {
      res.json(results);
    }
  );
});

//UPDATE
router.put("/", (req, res) => {
  connection.query(
    "UPDATE `employee` SET `name`= ?, `tel`= ?, `address`= ?, `salary`= ? WHERE employee_id = ?",
    [
      req.body.name,
      req.body.tel,
      req.body.address,
      req.body.salary,
      req.body.employee_id,
    ],
    (err, results) => {
      res.json(results);
    }
  );
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM `employee` WHERE employee_id = ?",
    [id],
    (err, results) => {
      res.json(results);
    }
  );
});

module.exports = router;
