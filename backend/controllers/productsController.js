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
  connection.query(
    "SELECT * FROM `products` ORDER BY product_name ASC",
    (err, results, fields) => {
      res.json(results);
    }
  );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `products` WHERE `product_id` = ?",
    [id],
    (err, results) => {
      res.json(results);
    }
  );
});

//CREATE
router.post("/", (req, res) => {
  console.log(req);
  connection.query(
    "INSERT INTO `products`(`product_name`, `product_desc`, `cost`, `price`, `stock`, `shelf`, `supplier_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.product_name,
      req.body.product_desc,
      req.body.cost,
      req.body.price,
      req.body.stock,
      req.body.shelf,
      req.body.supplier_id,
    ],
    (err, results) => {
      console.log(err);
      res.json(results);
    }
  );
});

//UPDATE
router.put("/", (req, res) => {
  connection.query(
    "UPDATE `products` SET `product_name`= ?, `product_desc`= ?, `cost`= ?, `price`= ?, `stock`= ?, `shelf`= ?, `supplier_id`= ? WHERE product_id = ?",
    [
      req.body.product_name,
      req.body.product_desc,
      req.body.cost,
      req.body.price,
      req.body.stock,
      req.body.shelf,
      req.body.supplier_id,
      req.body.product_id,
    ],
    (err, results) => {
      res.json(results);
    }
  );
});

router.put("/sell", (req, res) => {
  const promises = req.body.map((item) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE `products` SET `shelf` = `shelf` - ? WHERE `product_id` = ?",
        [item.shelf, item.product_id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  });

  Promise.all(promises).then(() => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO `bills`(`total_summary`, `discount`, `employee_id`, `member_id`) VALUES (?, ?, ?, ?)",
        [
          req.body[0].total_summary,
          req.body[0].discount,
          req.body[0].employee_id,
          req.body[0].member_id,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
      if (req.body[0].member_id) {
        connection.query(
          "UPDATE `members` SET `point` =  ? WHERE `member_id` = ?",
          [req.body[0].point, req.body[0].member_id],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      }
    })
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

router.post("/bill", (req, res) => {
  connection.query("SELECT LAST_INSERT_ID()", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    const lastId = rows[0]["LAST_INSERT_ID()"];
    const promises = req.body.map((item) => {
      return new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO products_bills (bill_id, product_id, quantity) VALUES (?, ?, ?)`,
          [lastId, item.product_id, item.shelf],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
    });

    Promise.all(promises)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM `products` WHERE product_id = ?",
    [id],
    (err, results) => {
      res.json(results);
    }
  );
});

module.exports = router;
