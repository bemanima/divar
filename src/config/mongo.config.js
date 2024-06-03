const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;

  try {
    if (mongoose.connections[0].readyState) return;

    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log("DB connection error =>", error);
  }
};

module.exports = connectToDB;
