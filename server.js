const express = require("express");
const cors = require("cors");
const { PORT } = require(".env");
const app = express();

require("dontenv").config();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use("/warehouses", warehouseRoutes);
app.use("/invetory", invemtoryRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
