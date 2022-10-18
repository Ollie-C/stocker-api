const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { readWarehouses } = require("../utils/helpers");

//get ALL warehouses
router.get("/", (req, res) => {
  const warehouses = readWarehouses();
  res.status(200).json(warehouses);
});

//get INDIVIDUAL warehouse
router.get("/:warehouseId", (req, res) => {
  //read data
  const warehouses = readWarehouses();
  //store id parameter
  const warehouseId = req.params.warehouseId;
  //find warehouse with id that matches parameter
  const currentWarehouse = warehouses.find(
    (warehouse) => warehouse.id === warehouseId
  );
  //temporary validation
  !currentWarehouse
    ? res.status(404).send(`Could not find warehouse with id ${warehouseId}`)
    : res.status(200).json(currentWarehouse);
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

//delete warehouse
router.delete("/:warehouseId", (req, res) => {
  //read json
  const warehouses = helpers.readWarehouses();

  //get id of each warehouse
  const warehouseId = req.params.warehouseId;
  console.log(warehouseId);

  const NewWarehouses = warehouses.filter(
    (warehouse) => warehouse.id !== warehouseId
  );

  // Now save it to the file
  fs.writeFileSync(
    "./data_test/warehouses.json",
    JSON.stringify(NewWarehouses)
  );
  res.status(204).end();
});

router.post("/", (req, res) => {
  const warehouses = [
    {
      id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      name: "Manhattan",
      address: "503 Broadway",
      city: "New York",
      country: "USA",
      contact: {
        name: "Parmin Aujla",
        position: "Warehouse Manager",
        phone: "+1 (646) 123-1234",
        email: "paujla@instock.com",
      },
    },
    {
      id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      name: "Washington",
      address: "33 Pearl Street SW",
      city: "Washington",
      country: "USA",
      contact: {
        name: "Greame Lyon",
        position: "Warehouse Manager",
        phone: "+1 (646) 123-1234",
        email: "glyon@instock.com",
      },
    },
    {
      id: "90ac3319-70d1-4a51-b91d-ba6c2464408c",
      name: "Jersey",
      address: "300 Main Street",
      city: "New Jersey",
      country: "USA",
      contact: {
        name: "Brad MacDonald",
        position: "Warehouse Manager",
        phone: "+1 (646) 123-1234",
        email: "bmcdonald@instock.com",
      },
    },
    {
      id: "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
      name: "San Fran",
      address: "890 Brannnan Street",
      city: "San Francisco",
      country: "USA",
      contact: {
        name: "Gary Wong",
        position: "Warehouse Manager",
        phone: "+1 (646) 123-1234",
        email: "gwong@instock.com",
      },
    },
    {
      id: "89898957-04ba-4bd0-9f5c-a7aea7447963",
      name: "Santa Monica",
      address: "520 Broadway",
      city: "Santa Monica",
      country: "USA",
      contact: {
        name: "Sharon Ng",
        position: "Warehouse Manager",
        phone: "+1 (646) 123-1234",
        email: "sng@instock.com",
      },
    },
    {
      id: "ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7",
      name: "Seattle",
      address: "1201 Third Avenue",
      city: "Seattle",
      country: "USA",
      contact: {
        name: "Daniel Bachu",
        position: "Warehouse Manager",
        phone: "+1 (646) 123-1234",
        email: "dbachu@instock.com",
      },
    },
    {
      id: "bb1491eb-30e6-4728-a5fa-72f89feaf622",
      name: "Miami",
      address: "2650 NW 5th Avenue",
      city: "Miami",
      country: "USA",
      contact: {
        name: "Alana Thomas",
        position: "Warehouse Manager",
        phone: "+1 (646) 123-1234",
        email: "athomas@instock.com",
      },
    },
    {
      id: "150a36cf-f38e-4f59-8e31-39974207372d",
      name: "Boston",
      address: "215 Essex Street",
      city: "Boston",
      country: "USA",
      contact: {
        name: "Vanessa Mendoza",
        position: "Warehouse Manager",
        phone: "+1 (646) 123-1234",
        email: "vmendoza@instock.com",
      },
    },
  ];

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
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouses));

  res.json(newWarehouse);
  console.log(newWarehouse);
});

module.exports = router;
