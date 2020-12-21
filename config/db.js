const mongoose = require("mongoose");
const config = require("config"); //grab string from required json
const db = config.get("mongoURI");

//connect to mongodb asynchronously
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
