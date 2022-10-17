const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const helpers = require("../utils/helpers");

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
