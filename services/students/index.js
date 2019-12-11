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

const writeFile = (filePath, student) => {
  const buffer = JSON.stringify(student);
  fs.writeFileSync(filePath, buffer);
}

router.get("/", (req, res) => {
  const studentsArray = readFile(filePath);
  res.send(studentsArray);
});

router.post("/", (req, res) => {
  let student=req.body;
  let allStudents = readFile(filePath);
  student._id = allStudents.length + 1
  student.createdAt = new Date();
  allStudents.push(student);
  writeFile(filePath, allStudents);
  res.send(student);
})

module.exports = router;
