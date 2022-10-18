const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { readInventories } = require("../utils/helpers");

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
  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventories));
});

module.exports = router;
