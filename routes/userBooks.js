const express = require("express");
const UserBooksModel = require("../models/userBooks");
const router = express.Router();

//Add new book to user
router.post("/", (req, res) => {
  UserBooksModel.create({ ...req.body }, (err, data) => {
    if (!err) return res.status(200).json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

//Get a user books by user id
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  UserBooksModel.find({ userId }, (err, data) => {
    if (!err) return res.json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  })
    .populate("userId")
    .populate("bookId")
    .populate("authorId");
});

//Get a a user books by

//update a user books
router.put("/:id", (req, res) => {
  const { id } = req.params;
  UserBooksModel.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
      rate: req.body.rate,
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
  UserBooksModel.findByIdAndDelete(id, (err, data) => {
    if (!err) return res.status(200).json(`One User Deleted`);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

module.exports = router;
