const express = require("express");
const { ObjectID } = require("mongodb");
const router = express.Router();
const Project = require("../models/project");
const Student = require("../models/student");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  res.send(await Project.find());
});

router.post(
  "/",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage(
        "Please provide project name. Lenght of name should be more than 5 characters."
      )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { studentID, name } = req.body;
    const project = { studentID, name };
    try {
      const newProject = await Project.create(project);
      await newProject.save();
      const studentProject = await Student.findByIdAndUpdate(
        { _id: studentID },
        {
          $push: {
            projects: {
              _id: newProject._id.toString(),
              name: newProject.name
            }
          }
        }
      );
      await studentProject.save();
      res.send(newProject);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

module.exports = router;
