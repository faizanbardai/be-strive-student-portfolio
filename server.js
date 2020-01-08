const express = require("express");
const listEndpoints = require("express-list-endpoints");
require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");
const studentSchema = require("./src/models/student");

const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
};
mongooseConnection();

const studentsRouter = require("./services/students");

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors());

server.use("/students", studentsRouter);

console.log(listEndpoints(server));

server.listen(port, () => console.log(`Listening on port ${port}!`));
