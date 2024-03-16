const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const CryptoJS = require("crypto-js");

const encrypt = (text) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

const decrypt = (data) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

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

//CREATE
router.post("/login", (req, res) => {
  console.log(req);
  connection.query(
    "SELECT * FROM `employee` WHERE `password` = ?",
    [encrypt(req.body.password)],
    (err, results, fields) => {
      res.json(results);
    }
  );
});

router.post("/", (req, res) => {
  connection.query(
    "INSERT INTO `employee`(`name`, `tel`, `address`,`salary`,`password`) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.name,
      req.body.tel,
      req.body.address,
      req.body.salary,
      encrypt(req.body.password),
    ],
    (err, results) => {
      res.json(results);
    }
  );
});

//UPDATE
router.put("/", (req, res) => {
  connection.query(
    "UPDATE `employee` SET `name`= ?, `tel`= ?, `address`= ?, `salary`= ?, `password`= ? WHERE employee_id = ?",
    [
      req.body.name,
      req.body.tel,
      req.body.address,
      req.body.salary,
      req.body.password,
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
