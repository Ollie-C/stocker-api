const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { readWarehouses, readInventories } = require("../utils/helpers");

//get ALL warehouses
router.get("/", (req, res) => {
  const warehouses = readWarehouses();
  res.status(200).json(warehouses);
});

//get INDIVIDUAL warehouse
router.get("/:warehouseId", (req, res) => {
  const warehouses = readWarehouses();
  const warehouseId = req.params.warehouseId;
  const currentWarehouse = warehouses.find(
    (warehouse) => warehouse.id === warehouseId
  );
  //temporary validation
  !currentWarehouse
    ? res.status(404).send(`Could not find warehouse with id ${warehouseId}`)
    : res.status(200).json(currentWarehouse);
});

//get individual warehouse INVENTORY
router.get("/:warehouseId/inventory", (req, res) => {
  const inventories = readInventories();
  const warehouseId = req.params.warehouseId;
  const currentInventory = inventories.filter(
    (inventory) => warehouseId === inventory.warehouseID
  );
  console.log(`Inventory for warehouse ${warehouseId}`);
  res.status(200).json(currentInventory);
});

//warehouse edit-1
router.put("/:warehouseId", (req, res) => {
  const warehouses = helpers.readWarehouses();
  const warehouseId = req.params.warehouseId;
  const {
    name,
    address,
    city,
    country,
    contact: { contactName, position, phone, email },
  } = req.body;

  const warehouseIndex = warehouses.findIndex(
    (warehouse) => warehouse.id === warehouseId
  );

  if (warehouseIndex) {
    warehouses[warehouseIndex].name = name;
    warehouses[warehouseIndex].address = address;
    warehouses[warehouseIndex].city = city;
    warehouses[warehouseIndex].country = country;
    warehouses[warehouseIndex].contact.name = contactName;
    warehouses[warehouseIndex].contact.position = position;
    warehouses[warehouseIndex].contact.phone = phone;
    warehouses[warehouseIndex].contact.email = email;

    // console.log(warehouses);
    fs.writeFileSync("./data_test/warehouses.json", JSON.stringify(warehouses));
    res.status(200).json(warehouses);
  } else
    res.status(400).json({
      errorMessage: `Warehouse with ID:${req.params.warehouseId} not found`,
    });
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
