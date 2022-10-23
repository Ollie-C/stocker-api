const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const {
  readWarehouses,
  readInventories,
  writeWarehouse,
  writeInventories,
} = require("../utils/helpers");

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

//warehouse edit/PUT
router.put("/:warehouseId", (req, res) => {
  const warehouses = readWarehouses();
  if (Object.keys(req.body).length === 0) {
    res.status(404).json({ errorMessage: "request needs a body" });
    return;
  }
  const warehouseId = req.params.warehouseId;
  const {
    name,
    address,
    city,
    country,
    contact: { contactName, position, phone, email },
  } = req.body;

  const warehouse = warehouses.find(
    (warehouse) => warehouse.id === warehouseId
  );

  if (warehouse) {
    warehouse.name = name;
    warehouse.address = address;
    warehouse.city = city;
    warehouse.country = country;
    warehouse.contact.name = contactName;
    warehouse.contact.position = position;
    warehouse.contact.phone = phone;
    warehouse.contact.email = email;

    writeWarehouse(warehouses);
    res.status(200).json(warehouses);
  } else
    res.status(404).json(`Could not find warehouse with id ${warehouseId}`);
});

//delete warehouse
router.delete("/:warehouseId", (req, res) => {
  const warehouses = readWarehouses();
  const warehouseId = req.params.warehouseId;
  console.log(warehouseId);

  const NewWarehouses = warehouses.filter(
    (warehouse) => warehouse.id !== warehouseId
  );

  writeWarehouse(NewWarehouses);
  res.status(204).end();
});

//post warehouse
router.post("/", (req, res) => {
  const warehouses = readWarehouses();
  if (Object.keys(req.body).length === 0) {
    res.status(404).json({ errorMessage: "request needs a body" });
    return;
  }
  const {
    name,
    address,
    city,
    country,
    contact: { contactName, position, phone, email },
  } = req.body;
  console.log(req.body);
  const newWarehouse = {
    id: uuid(),
    name: name,
    address: address,
    city: city,
    country: country,
    contact: {
      name: contactName,
      position: position,
      phone: phone,
      email: email,
    },
  };
  warehouses.push(newWarehouse);
  writeWarehouse(warehouses);
  res.status(200).json(warehouses);

  res.status(200).json(newWarehouse);
  console.log(newWarehouse);
});

module.exports = router;
