const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//DEFINE OF THE SCHEMA {THE STRUCTURE OF THE CATEGORY}
const categorySchema = new Schema({
  name: { type: String, required: true },
});

//CREATE MODEL BASED ON SCHEMA
const categoryModel = mongoose.model("categories", categorySchema);

//EXPORT THE MODEL
module.exports = categoryModel;
