const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const helpers = require("../utils/helpers");

module.exports = router;

//get
router.get("/", (req, res) => {
  const warehouses = JSON.parse(fs.readFileSync("./data_test/warehouses.json"));
  res.status(200).json(warehouses);
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

module.exports = router;
