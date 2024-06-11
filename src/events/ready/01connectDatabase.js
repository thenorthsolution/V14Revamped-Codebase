require("colors");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

module.exports = async () => {
  if (!mongoURI) return;

  mongoose.set("strictQuery", true);
  const dbConnected = await mongoose.connect(mongoURI);

  dbConnected
    ? console.log("[SUCCESS]".green + "Connected to the MongoDB database.")
    : console.log("[ERROR]".red + "Failed to connect to the MongoDB database.\nCheck if your MONGODB_TOKEN in your .env file is correct and you removed the < > symbols that are around your password.");
};