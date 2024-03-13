const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productsController = require("./controllers/productsController");
const supplierController = require("./controllers/supplierController");
const membersController = require("./controllers/membersController");
const employeeController = require("./controllers/employeeController");
const billsController = require("./controllers/billsController");
const productsBillsController = require("./controllers/productsBillsController");

const app = express();
const port = 4900;

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productsController);
app.use("/supplier", supplierController);
app.use("/members", membersController);
app.use("/employee", employeeController);
app.use("/bills", billsController);
app.use("/productsBills", productsBillsController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
