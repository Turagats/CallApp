const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
let cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/addData", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const gender = req.body.gender;
  const street = req.body.address.street;
  const city = req.body.address.city;
  const phone = req.body.phone;

  // Read the existing data from the file
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;

    let existingData = [];

    try {
      existingData = JSON.parse(data);
    } catch (err) {
      console.error(`Error parsing existing data: ${err}`);
    }

    // Create a new data object with the received data
    const newData = {
      name: name,
      email: email,
      gender: gender,
      address: {
        street: street,
        city: city,
      },
      phone: phone,
    };

    // Append the new data to the existing data array
    existingData.push(newData);

    // Write the updated data back to the file
    fs.writeFile("data.json", JSON.stringify(existingData), (err) => {
      if (err) throw err;
      console.log("Data written to file");

      res.json({ message: "Data received and written to file!" });
    });
  });
});

app.put("/editData", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const gender = req.body.gender;
  const street = req.body.address.street;
  const city = req.body.address.city;
  const phone = req.body.phone;

  // Read the existing data from the file
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;

    let existingData = [];

    try {
      existingData = JSON.parse(data);
    } catch (err) {
      console.error(`Error parsing existing data: ${err}`);
    }

    // Find the index of the data object with the matching id
    const index = existingData.findIndex((data) => data.id === id);

    // If the index is not found, return an error response
    if (index === -1) {
      return res.status(404).json({ error: `Data with id ${id} not found` });
    }

    // Create a new data object with the received data
    const newData = {
      id: id,
      name: name,
      email: email,
      gender: gender,
      address: {
        street: street,
        city: city,
      },
      phone: phone,
    };

    // Replace the existing data object with the new data object
    existingData[index] = newData;

    // Write the updated data back to the file
    fs.writeFile("data.json", JSON.stringify(existingData), (err) => {
      if (err) throw err;
      console.log("Data written to file");

      res.json({ message: `Data with id ${id} updated successfully` });
    });
  });
});
