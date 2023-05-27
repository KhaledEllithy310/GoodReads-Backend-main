const mongoose = require("mongoose");
const reviewsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  bookId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "books",
    required: true,
  },
  review: {
    type: String,
  },
});

const reviewsModel = mongoose.model("reviews", reviewsSchema);

module.exports = reviewsModel;