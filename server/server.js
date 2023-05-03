const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
let cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/", (req, res) => {
  const { prevObject, newObject } = req.body;
  // combine the new object with the previous object
  // const updatedObject
  data = {
    ...prevObject,
    objects: [...prevObject.objects, newObject],
  };
  // send back the updated object
  res.json(updatedObject);
});
