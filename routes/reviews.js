const express = require("express");
const ReviewsModel = require("../models/reviews");
const router = express.Router();

//Add new review
router.post("/", (req, res) => {
  ReviewsModel.create({ ...req.body }, (err, data) => {
    if (!err) return res.status(200).json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

//Get a book reviews by book id
router.get("/:bookId", (req, res) => {
  const { bookId } = req.params;
  ReviewsModel.find({ bookId }, (err, data) => {
    if (!err) return res.json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  }).populate("bookId").populate("userId");
});

//update a user review
router.put("/:id", (req, res) => {
  const { id } = req.params;
  ReviewsModel.findByIdAndUpdate(
    id,
    {
      review: req.body.review,
    },
    (err, data) => {
      if (!err) return res.status(200).json(data);
      return res.status(500).json({ Error: "DB_ERR" });
    }
  );
});

//Delete a user review
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ReviewsModel.findByIdAndDelete(id, (err, data) => {
    if (!err) return res.status(200).json(`One User Deleted`);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

module.exports = router;
