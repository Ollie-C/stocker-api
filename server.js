const express = require("express");
const cors = require("cors");

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use("/warehouses", warehouseRoutes);
app.use("/invetory", invemtoryRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
