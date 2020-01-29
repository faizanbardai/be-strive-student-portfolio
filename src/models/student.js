const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }]
  },
  { timestamps: true }
);

const studentCollection = mongoose.model("Student", studentSchema);

module.exports = studentCollection;
