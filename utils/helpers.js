const fs = require("fs");

const readWarehouses = () => {
  return JSON.parse(fs.readFileSync("./data_test/warehouses.json"));
};
const readInventories = () => {
  return JSON.parse(fs.readFileSync("./data_test/inventories.json"));
};

module.exports = { readWarehouses, readInventories };
