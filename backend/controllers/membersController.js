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
  connection.query("SELECT * FROM `members`", (err, results, fields) => {
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `members` WHERE `member_id` = ?",
    [id],
    (err, results) => {
      res.json(results);
    }
  );
});

//CREATE
router.post("/", (req, res) => {
  connection.query(
    "INSERT INTO `members`(`name`, `tel`, `point`) VALUES (?, ?, ?)",
    [req.body.name, req.body.tel, req.body.point],
    (err, results) => {
      res.json(results);
    }
  );
});

//UPDATE
router.put("/", (req, res) => {
  connection.query(
    "UPDATE `members` SET `name`= ?, `tel`= ?, `point`= ? WHERE member_id = ?",
    [req.body.name, req.body.tel, req.body.point],
    (err, results) => {
      res.json(results);
    }
  );
});

//DELETE
router.delete("/", (req, res) => {
  connection.query(
    "DELETE FROM `members` WHERE member_id = ?",
    [req.body.member_id],
    (err, results) => {
      res.json(results);
    }
  );
});

module.exports = router;
