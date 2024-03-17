const express = require("express");
const router = express.Router();
const connection = require("../connect");

//CREATE
router.post("/", (req, res) => {
  connection.query(
    "SELECT * FROM `bills` WHERE `employee_id` = ? ORDER BY `date` DESC",
    req.body.id,
    (err, results, fields) => {
      res.json(results);
    }
  );
});

//GET
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `products_bills` INNER JOIN `products` ON `products`.`product_id` = `products_bills`.`product_id` INNER JOIN `bills` ON `products_bills`.`bill_id` = `bills`.`bill_id` INNER JOIN `employee` ON `bills`.`employee_id` = `employee`.`employee_id`  WHERE `products_bills`.`bill_id` = ?",
    [id],
    (err, results) => {
      const result = results.map((item) => {
        const {
          list_id,
          bill_id,
          supplier_id,
          employee_id,
          member_id,
          password,
          salary,
          stock,
          shelf,
          cost,
          ...rest
        } = item;
        return rest;
      });
      res.json([result]);
    }
  );
});

module.exports = router;
