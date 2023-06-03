const express = require("express");
const UsersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const router = express.Router();
const upload = require("../middleware/uploads");

//Add new user
router.post("/", upload("assets/users_up"), (req, res) => {
  const { firstName, lastName, password, email, role } = req.body;
  const { file } = req;
  UsersModel.create(
    { firstName, lastName, password, email, role, avatar: file.path || null },
    (err, userData) => {
      if (!err) return res.status(200).json(userData);
      return res.status(500).json({ Error: "DB_ERR" });
    }
  );
});

//Get all users
router.get("/", (req, res) => {
  UsersModel.find({}, (err, usersData) => {
    if (!err) return res.status(200).json(usersData);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

//Get a user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  UsersModel.findById(id, (err, userData) => {
    if (!err) return res.json(userData);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

//update a user by id
let oldUser;
router.put("/:id", upload("assets/users_up"), async (req, res) => {
  const { id } = req.params;
  //Encrypt user password
  encryptedPassword = await bcrypt.hash(req.body.password, 10);

  UsersModel.findById(id, (err, oldUser) => {
    let updatedAvatar;
    if (req.file!=null) {
      updatedAvatar = req.file.path;
    } else {
      updatedAvatar = oldUser.avatar;
    }
  UsersModel.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: encryptedPassword,
        email: req.body.email,
        avatar: updatedAvatar || null
      },
      (err, data) => {
        if (!err) return res.status(200).json(data);
        return res.status(500).json({ Error: "DB_ERR" });
      }
    );
  });
});

//Delete a user by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  UsersModel.findByIdAndDelete(id, (err, data) => {
    if (!err) return res.status(200).json(`One User Deleted => ${data}`);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

module.exports = router;
