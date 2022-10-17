const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const helpers = require("../utils/helpers");

//get
router.get("/", (req, res) => {
  const warehouses = JSON.parse(fs.readFileSync("./data_test/warehouses.json"));
  res.status(200).json(warehouses);
});

//delete warehouse
router.delete("/:warehouseId", (req, res) => {
  //read json
  const warehouses = helpers.readWarehouses();

  //get id of each warehouse
  const warehouseId = req.params.warehouseId;
  console.log(warehouseId);

  const NewWarehouses = warehouses.filter(
    (warehouse) => warehouse.id !== warehouseId
  );

  // Now save it to the file
  fs.writeFileSync(
    "./data_test/warehouses.json",
    JSON.stringify(NewWarehouses)
  );
  res.status(204).end();
});

module.exports = router;
