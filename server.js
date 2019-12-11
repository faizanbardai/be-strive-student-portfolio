const express = require("express");
const cors = require("cors");

const server = express();
const port = 3001;
const studentsRouter = require("./services/students");

server.use(express.json());
server.use("/students", studentsRouter);
server.use(cors());

server.listen(port, () => console.log(`Listening on port ${port}!`));