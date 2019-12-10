const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();


const filePath = path.join(__dirname, "student-data.json");

const readFile = filePath => {
  const buffer = fs.readFileSync(filePath);
  const fileContent = buffer.toString();
  return JSON.parse(fileContent);
};

router.get("/", (req, res) => {
    const studentsArray = readFile(filePath);
    res.send(studentsArray);
  });

module.exports = router;
