const { Schema, model } = require("mongoose");

const exampleSchema = new Schema({});

module.exports = model("Example", exampleSchema);
