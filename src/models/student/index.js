const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    projects: [
      {
        _id: { type: String },
        name: { type: String }
      }
    ]
  },
  { timestamps: { createdAt: "created_at" } }
);

const studentCollection = mongoose.model("student", studentSchema);

module.exports = studentCollection;
