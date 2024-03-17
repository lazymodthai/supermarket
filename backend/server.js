const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productsController = require("./controllers/productsController");
const supplierController = require("./controllers/supplierController");
const membersController = require("./controllers/membersController");
const employeeController = require("./controllers/employeeController");
const billsController = require("./controllers/billsController");

const app = express();
const port = 4900;

// Middleware to log all requests with colored output based on HTTP method
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  let methodColor = "\x1b[0m"; // default color (white)
  switch (req.method) {
    case "GET":
      methodColor = "\x1b[34m"; // blue
      break;
    case "PUT":
      methodColor = "\x1b[33m"; // yellow
      break;
    case "POST":
      methodColor = "\x1b[32m"; // green
      break;
    case "DELETE":
      methodColor = "\x1b[31m"; // red
      break;
  }
  console.log(
    `${timestamp} - ${methodColor}${req.method}\x1b[0m ${req.originalUrl}`
  );
  next();
});

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productsController);
app.use("/supplier", supplierController);
app.use("/members", membersController);
app.use("/employee", employeeController);
app.use("/bills", billsController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
