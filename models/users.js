const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  },
  role: {
    //false = user , true = admin
    type: Boolean,
    default: false,
    required: true,
  },
  avatar:{
    type: String,
    default:'https://i.ibb.co/VcYyV2s/default-avatar.png',
  },
  token: {
    type: String,
  },
});

const UsersModel = mongoose.model("users", usersSchema);

module.exports = UsersModel;
