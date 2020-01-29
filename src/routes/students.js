const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/student");

router.get("/", async (req, res) => {
  try {
    const documentCount = await Student.estimatedDocumentCount();
    const studentsFound = await Student.find({});
    res.json({ documentCount, studentsFound });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Student.findById({ _id: req.params.id });
    if (result) res.send(result);
    else res.status(404).send("not found");
  } catch (error) {
    console.log(error);
  }
});

// router.get(
//   "/checkEmail/:email",
//   [
//     check("email")
//       .isEmail()
//       .normalizeEmail()
//       .withMessage("Email is not valid!")
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     const email = req.params.email;
//     try {
//       const result = await Student.findOne({ email: req.params.email });
//       res.send(result ? false : true);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

router.post(
  "/",
  [
    check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required!"),
    check("name")
      .exists({ checkNull: true, checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage("Name must contain atlease 2 characters!"),
    check("surname")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("Surname must be provided!"),
    check("dob")
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
    const { email, name, surname, dob } = req.body;
    let student = { email, name, surname, dob };
    try {
      const newStudent = await Student.create(student);
      await newStudent.save();
      res.send(newStudent);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const result = await Student.findOneAndDelete({ _id: req.params.id });
    if (result) res.send(result);
    else res.status(404).send("not found");
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
