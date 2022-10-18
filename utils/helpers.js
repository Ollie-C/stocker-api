const fs = require("fs");

const readWarehouses = () => {
  return JSON.parse(fs.readFileSync("./data_test/warehouses.json"));
};
const readInventories = () => {
  return JSON.parse(fs.readFileSync("./data_test/inventories.json"));
};

const writeWarehouse = (warehouseData) => {
  fs.writeFileSync(
    "./data_test/warehouses.json",
    JSON.stringify(warehouseData)
  );
};

const writeInventories = (inventoriesData) => {
  fs.writeFileSync(
    "./data_test/inventories.json",
    JSON.stringify(inventoriesData)
  );
};

module.exports = {
  readWarehouses,
  readInventories,
  writeWarehouse,
  writeInventories,
};
