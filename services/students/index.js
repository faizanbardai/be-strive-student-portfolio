const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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

const studentsArray = readFile(filePath);

router.get("/", (req, res) => {
  const studentsNameAndId = studentsArray.map(student => {
    let container = {
      fullName: `${student.name} ${student.surname}`,
      ID: student._id
    };
    return container;
  });
  res.send(studentsNameAndId);
});

router.get("/:id", (req, res) => {
  const studentID = req.params.id;
  const student = studentsArray.find(
    student => student._id === parseInt(studentID)
  );
  res.send(student);
});

router.get(
  "/checkEmail/:email",
  [
    check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not valid!")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const email = req.params.email;
    let answer = studentsArray.filter(student => student.email === email);
    return res.send(answer.length ? false : true);
  }
);

router.post(
  "/",
  [
    check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not valid!"),
    check("name")
      .exists({ checkNull: true, checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage("Name must contain atlease 2 characters!"),
    check("surname")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("Surname must be provided!"),
    check("dob")
      .isISO8601()
      .isBefore()
      .withMessage(
        "Date of birth should be formatted as per ISO8601 and must be before today!"
      )
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let student = {
      ...req.body,
      _id: parseInt(studentsArray.length + 1),
      createdAt: new Date()
    };
    studentsArray.push(student);
    writeFile(filePath, studentsArray);
    let container = {
      fullName: `${student.name} ${student.surname}`,
      ID: student._id
    };
    res.send(container);
  }
);

module.exports = router;
