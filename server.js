const express = require("express");
require('dotenv').config();
const cors = require("cors");

const server = express();
const port = process.env.PORT;
const studentsRouter = require("./services/students");

server.use(express.json());
server.use(cors());
server.use("/students", studentsRouter);

server.listen(port, () => console.log(`Listening on port ${port}!`));