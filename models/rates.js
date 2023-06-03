const mongoose = require("mongoose");
const ratesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
    required: true,
  },
  rate: {
    type: Number,
  },
});

const ratesModel = mongoose.model("rates", ratesSchema);

module.exports = ratesModel;