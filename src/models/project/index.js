const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  studentID: { type: String, required: true }
});

const projectCollection = mongoose.model("project", projectSchema);

module.exports = projectCollection;
