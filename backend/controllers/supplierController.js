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
  connection.query("SELECT * FROM `supplier`", (err, results, fields) => {
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `supplier` WHERE `supplier_id` = ?",
    [id],
    (err, results) => {
      res.json(results);
    }
  );
});

//CREATE
router.post("/", (req, res) => {
  connection.query(
    "INSERT INTO `supplier`(`name`, `address`, `contact_name`, `tel`) VALUES (?, ?, ?, ?)",
    [req.body.name, req.body.address, req.body.contact_name, req.body.tel],
    (err, results) => {
      res.json(results);
    }
  );
});

//UPDATE
router.put("/", (req, res) => {
  connection.query(
    "UPDATE `supplier` SET `name`= ?, `address`= ?, `contact_name`= ?, `tel`= ? WHERE supplier_id = ?",
    [
      req.body.name,
      req.body.address,
      req.body.contact_name,
      req.body.tel,
      req.body.supplier_id,
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
    "DELETE FROM `supplier` WHERE supplier_id = ?",
    [id],
    (err, results) => {
      res.json(results);
    }
  );
});

module.exports = router;
