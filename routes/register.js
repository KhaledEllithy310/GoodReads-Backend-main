const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const upload = require("../middleware/uploads");
const router = express.Router();

router.post("/", upload, async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;
    const { file } = req;
    // Validate user input
    if (!(email && password && firstName && lastName && file)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    // const _email = email.toLowerCase();
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      avatar: file.path || null,
    });

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
