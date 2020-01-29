const mongoose = require("mongoose");
const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongooseConnection;
