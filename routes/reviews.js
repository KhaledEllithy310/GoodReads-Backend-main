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
  })
    .populate("bookId")
    .populate("userId");
});

//update a user review
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   ReviewsModel.findByIdAndUpdate(
//     id,
//     {
//       review: req.body.review,
//     },
//     (err, data) => {
//       if (!err) return res.status(200).json(data);
//       return res.status(500).json({ Error: "DB_ERR" });
//     }
//   );
// });

//Delete a user review
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ReviewsModel.findByIdAndDelete(id, (err, data) => {
    if (!err) return res.status(200).json(`One User Deleted`);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

//show rate for one user
router.get("/:bookId/:userId", (req, res) => {
  const { bookId, userId } = req.params;
  ReviewsModel.findOne({ bookId, userId }, (err, data) => {
    if (!err) return res.json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  }).populate("userId");
});


//Add or update rate or review
router.post("/:bookId/:userId",async (req, res) => {
  const { bookId, userId } = req.params;
  const old = await ReviewsModel.findOne({ bookId, userId });
  console.log(old);
  if (old) {
    ReviewsModel.updateOne(
      { bookId, userId },
      {
        review: req.body.review || old.review,
        rate: req.body.rate || old.rate,
      },
      (err, data) => {
        if (!err) return res.status(200).json(data);
        return res.status(500).json({ Error: "DB_ERR" });
      }
    );
  } else {
    ReviewsModel.create({ ...req.body }, (err, data) => {
      if (!err) return res.status(200).json(data);
      return res.status(500).json({ Error: "DB_ERR" });
    });
  }
});

module.exports = router;
