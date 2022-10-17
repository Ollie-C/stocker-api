const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const helpers = require("../utils/helpers");

//get ALL warehouses
router.get("/", (req, res) => {
  const warehouses = JSON.parse(fs.readFileSync("./data/warehouses.json"));
  res.status(200).json(warehouses);
});

module.exports = router;
