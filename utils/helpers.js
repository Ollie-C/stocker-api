const fs = require("fs");

const readWarehouses = () => {
  return JSON.parse(fs.readFileSync("./data/warehouses.json"));
};
const readInventories = () => {
  return JSON.parse(fs.readFileSync("./data/inventories.json"));
};

module.exports = { readWarehouses, readInventories };
