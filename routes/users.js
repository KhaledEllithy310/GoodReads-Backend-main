const express = require("express");
const UsersModel = require("../models/users");
const router = express.Router();
const upload = require("../middleware/uploads");

//Add new user
router.post("/", upload("assets/users_up"), (req, res) => {
  const { firstName, lastName, password, email,role } = req.body;
  const { file } = req;
  UsersModel.create(
    { firstName, lastName, password, email,role ,avatar: file.path || null },
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
router.put("/:id",upload("assets/users_up"), (req, res) => {
  const { id } = req.params;
  UsersModel.findByIdAndUpdate(
    id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
      avatar: req.file.path  || null 
    },
    (err, data) => {
      if (!err) return res.status(200).json(data);
      return res.status(500).json({ Error: "DB_ERR" });
    }
  );
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
