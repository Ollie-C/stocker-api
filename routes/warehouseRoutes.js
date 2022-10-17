const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { readWarehouses } = require("../utils/helpers");

//get ALL warehouses
router.get("/", (req, res) => {
  const warehouses = readWarehouses();
  res.status(200).json(warehouses);
});

//get INDIVIDUAL warehouse
router.get("/:warehouseId", (req, res) => {
  //read data
  const warehouses = readWarehouses();
  //store id parameter
  const warehouseId = req.params.warehouseId;
  //find warehouse with id that matches parameter
  const currentWarehouse = warehouses.find(
    (warehouse) => warehouse.id === warehouseId
  );
  //temporary validation
  !currentWarehouse
    ? res.status(404).send(`Could not find warehouse with id ${warehouseId}`)
    : res.status(200).json(currentWarehouse);
});

module.exports = router;
