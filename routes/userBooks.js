const express = require("express");
const UserBooksModel = require("../models/userBooks");
const router = express.Router();

//Add new book to user
// router.post("/", (req, res) => {
//   UserBooksModel.create({ ...req.body }, (err, data) => {
//     if (!err) return res.status(200).json(data);
//     return res.status(500).json({ Error: "DB_ERR" });
//   });
// });

//Get a user books by user id
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  UserBooksModel.find({ userId }, (err, data) => {
    if (!err) return res.json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  })
    .populate("userId")
    .populate("bookId");
  // .populate("authorId");
});

//Get a a user book
router.get("/:bookId/:userId", (req, res) => {
  const { bookId, userId } = req.params;
  UserBooksModel.find({ bookId, userId }, (err, data) => {
    if (!err) return res.json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  }).populate("bookId");
});

//Get a book reviews
router.post("/reviews", (req, res) => {
  const { bookId } = req.body;
  UserBooksModel.find({ bookId }, (err, data) => {
    if (!err) return res.json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  }).populate("userId");
});

//update a user books
router.put("/:id", (req, res) => {
  const { id } = req.params;
  UserBooksModel.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
    },
    (err, data) => {
      if (!err) return res.status(200).json(data);
      return res.status(500).json({ Error: "DB_ERR" });
    }
  );
});

//Add or update rate or review
router.post("/", async (req, res) => {
  const { bookId, userId } = req.body;
  console.log(bookId);
  console.log(userId);
  const old = await UserBooksModel.findOne({ bookId, userId });
  console.log(old);
  if (old != null) {
    UserBooksModel.updateOne(
      { bookId, userId },
      {
        review: req.body.review || old.review || null,
        rate: req.body.rate || old.rate || null,
        status: req.body.status || old.status || null,
      },
      (err, data) => {
        if (!err) return res.status(200).json(data);
        return res.status(500).json({ Error: "DB_ERR" });
      }
    );
  } else {
    UserBooksModel.create(
      {
        userId:req.body.userId,
        bookId:req.body.bookId,
        authorId:req.body.authorId,
        status: req.body.status,
        review: req.body.review,
        rate: req.body.rate,
      },
      (err, data) => {
        if (!err) return res.status(200).json(data);
        return res.status(500).json({ Error: "DB_ERR" });
      }
    );
  }
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
