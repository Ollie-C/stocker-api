const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { readInventories, writeInventories } = require("../utils/helpers");

//get ALL inventories
router.get("/", (req, res) => {
  const inventories = readInventories();
  res.status(200).json(inventories);
});

//get INDIVIDUAL inventory item
router.get("/:itemId", (req, res) => {
  //read data
  const inventories = readInventories();
  //store id parameter
  const itemId = req.params.itemId;
  //find warehouse with id that matches parameter
  const currentItem = inventories.find((item) => item.id === itemId);
  //temporary validation
  !currentItem
    ? res.status(404).send(`Could not find item with id ${itemId}`)
    : res.status(200).json(currentItem);
});

//delete inventory
router.delete("/:itemId", (req, res) => {
  //read json
  const inventories = readInventories();
  const itemId = req.params.itemId;

  //get id of each warehouse
  const newInventory = inventories.filter((item) => item.id !== itemId);

  // Now save it to the file
  writeInventories(newInventory);
  res.status(204).end();
});

//inventory edit-1
router.put("/:itemId", (req, res) => {
  const inventories = readInventories();
  const itemId = req.params.itemId;
  const { itemName, description, category, status, quantity, warehouseName } =
    req.body;

  const currentItem = inventories.find((item) => item.id === itemId);

  if (currentItem) {
    currentItem.itemName = itemName;
    currentItem.description = description;
    currentItem.category = category;
    currentItem.status = status;
    currentItem.quantity = quantity;
    currentItem.warehouseName = warehouseName;

    writeInventories(inventories);
    res.status(200).json(inventories);
  } else res.status(400).json(`Could not find inventory with id ${itemId}`);
});

// const findWarehouseID = (name) => {
//   const warehouses =
//   const warehouse = warehouses.find((element) => {
//     warehouse.name = name;
//   });
//   const { id } = warehouse;
//   return id;
// };

router.post("/", (req, res) => {
  const inventories = helpers.readInventories();
  const {
    itemName,
    description,
    category,
    status,
    quantity,
    warehouseName,
    warehouseID,
  } = req.body;
  const newInventory = {
    id: uuid(),
    warehouseID: warehouseID,
    warehouseName: warehouseName,
    itemName: itemName,
    description: description,
    category: category,
    status: status,
    quantity: quantity,
  };
  inventories.push(newInventory);
  writeInventories(inventories);
  res.status(200).json(inventories);
});

module.exports = router;
