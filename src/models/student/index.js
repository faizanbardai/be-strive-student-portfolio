var mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var studentSchema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  dob: {type: String, required: true}
});

var studentCollection = mongoose.model('student', studentSchema);

module.exports = studentCollection;
