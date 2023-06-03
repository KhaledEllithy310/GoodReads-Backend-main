const mongoose = require("mongoose");
const userBooksSchema = new mongoose.Schema({
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
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true,
  },
  status: {
    type: String,
    enum: ["reading", "want to read", "readed"],
  },
  rate:{
    type: Number,
  }
});

const UserBooksModel = mongoose.model("usersBooks", userBooksSchema);

module.exports = UserBooksModel;
