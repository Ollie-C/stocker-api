const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const {
  readInventories,
  writeInventories,
  readWarehouses,
} = require("../utils/helpers");

//get ALL inventories
router.get("/", (req, res) => {
  const inventories = readInventories();
  res.status(200).json(inventories);
});

//get INDIVIDUAL inventory item
router.get("/:itemId", (req, res) => {
  const inventories = readInventories();
  const itemId = req.params.itemId;
  const currentItem = inventories.find((item) => item.id === itemId);
  !currentItem
    ? res.status(404).json(`Could not find item with id ${itemId}`)
    : res.status(200).json(currentItem);
});

//delete inventory
router.delete("/:itemId", (req, res) => {
  const inventories = readInventories();
  const itemId = req.params.itemId;

  const newInventory = inventories.filter((item) => item.id !== itemId);

  writeInventories(newInventory);
  res.status(204).end();
});

//inventory edit-1
router.put("/:itemId", (req, res) => {
  const inventories = readInventories();
  if (Object.keys(req.body).length === 0) {
    res.status(404).json({ errorMessage: "request needs a body" });
    return;
  }
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

router.post("/", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(404).json({ errorMessage: "request needs a body" });
    return;
  }
  const inventories = readInventories();
  const { itemName, description, category, quantity, warehouseName } = req.body;

  // Find the warehouse ID by matching the name in the request body with a name in the warehouse data
  const warehouses = readWarehouses();
  const warehouse = warehouses.find(
    (warehouse) => warehouse.name == warehouseName
  );

  //Instead of passing status from the request body, have it set automatically to one of two options dependant on quantity
  const status = quantity > 0 ? "In Stock" : "Out of Stock";

  const newInventory = {
    id: uuid(),
    warehouseID: warehouse.id,
    warehouseName: warehouseName,
    itemName: itemName,
    description: description,
    category: category,
    status: status,
    quantity: parseInt(quantity),
  };
  inventories.push(newInventory);

  writeInventories(inventories);
  res.status(200).json(inventories);
});

module.exports = router;
