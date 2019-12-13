const express = require("express");
var multer = require("multer");
const { readFile, writeFile } = require("fs-extra");
const path = require("path");
const router = express.Router();
const { sanitize, check, validationResult } = require("express-validator");

const studentDataFilePath = path.join(__dirname, "student-data.json");

const writeStudentFile = async (path, student) => {
  const buffer = JSON.stringify(student);
  await writeFile(path, buffer);
};

const readStudentFile = async path => {
  const buffer = await readFile(studentDataFilePath);
  const fileContent = buffer.toString();
  return JSON.parse(fileContent);
};

router.get("/", async (req, res) => {
  const studentsArray = await readStudentFile(studentDataFilePath);
  res.send(studentsArray);
});

router.get("/:id", [sanitize("id").toInt()], async (req, res) => {
  const studentsArray = await readStudentFile(studentDataFilePath);
  const studentID = req.params.id;
  const student = studentsArray.find(student => student._id === studentID);
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const email = req.params.email;
    const studentsArray = await readStudentFile(studentDataFilePath);
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const studentsArray = await readStudentFile(studentDataFilePath);
    let student = {
      ...req.body,
      _id: studentsArray.length + 1,
      createdAt: new Date()
    };
    studentsArray.push(student);
    writeStudentFile(studentDataFilePath, studentsArray);
    res.send(student);
  }
);

var upload = multer({});

router.post("/:id/uploadPhoto", upload.single("studentImg"), async (req, res) => {
  const studentID = req.body.studentID;
  const {originalname, buffer} = req.file;
  const ext = path.extname(originalname);
  const fileNameToBeSaved = studentID.concat(ext);
  const filepath = path.join(__dirname, "../../public/img/students/").concat(fileNameToBeSaved);
  await writeFile(filepath, buffer);
  res.send(filepath);
});

module.exports = router;
