const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//DEFINE OF THE SCHEMA {THE STRUCTURE OF THE author}
const authorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  avatar: { type: String },
});

//CREATE MODEL BASED ON SCHEMA
const authorModel = mongoose.model("authors", authorSchema);

//EXPORT THE MODEL
module.exports = authorModel;
