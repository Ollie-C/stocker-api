const express = require("express");
const cors = require("cors");
const app = express();
const warehouseRoutes = require("./routes/warehouseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

//.ENV
require("dotenv").config();
const { PORT } = process.env;

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use("/warehouses", warehouseRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
