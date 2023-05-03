const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // next();
// });

app.get("/", (req, res) => {
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
