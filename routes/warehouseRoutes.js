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
  // console.log(warehouseItems);

  //get id of each warehouse
  const warehouseId = req.params.warehouseId;
  console.log(warehouseId);

  const NewWarehouses = warehouses.filter(
    (warehouse) => warehouse.id !== warehouseId
  );

  // Now we've updated `videos` to have the filtered comments - save it to the file
  fs.writeFileSync(
    "./data_test/warehouses.json",
    JSON.stringify(NewWarehouses)
  );
  res.status(204).end();
});

// warehouse edit
router.put("/:warehouseId", (req, res) => {
  const warehouses = helpers.readWarehouses();
  const warehouseId = req.params.warehouseId;

  const warehouseIndex = warehouses.findIndex(
    (warehouse) => warehouse.id === warehouseId
  );

  const newWarehouse = {
    ref: uuidv4(),
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    country: {},
  };

  warehouses[warehouseIndex].push(newWarehouse);

  fs.writeFileSync("./data_test/warehouses.json", JSON.stringify(warehouses));
  res.status(200).json(newWarehouse);
});

module.exports = router;
