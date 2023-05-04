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
  console.log(
    `Received data: ${name} ${email}  ${gender}  ${street}  ${city}  ${phone}`
  );
  res.json({ message: "Data received!" });
});
