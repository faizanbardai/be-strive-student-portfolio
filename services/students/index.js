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
};

router.get("/", (req, res) => {
  const studentsArray = readFile(filePath);
  const studentsNameAndId = studentsArray.map(student => {
    let container = {
      fullName: `${student.name} ${student.surname}`,
      ID: student._id
    };
    return container;
  });
  res.send(studentsNameAndId);
});

router.post("/", (req, res) => {
  let allStudents = readFile(filePath);
  let student = {
    ...req.body,
    _id: allStudents.length + 1,
    createdAt: new Date()
  };
  allStudents.push(student);
  writeFile(filePath, allStudents);
  let container = {
    fullName: `${student.name} ${student.surname}`,
    ID: student._id
  };
  res.send(container);
});

module.exports = router;
