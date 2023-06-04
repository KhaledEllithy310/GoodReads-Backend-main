const express = require("express");
const RatesModel = require("../models/rates");
const router = express.Router();

//Add new rate
router.post("/", (req, res) => {
    RatesModel.create({ ...req.body }, (err, data) => {
    if (!err) return res.status(200).json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

//Get a book rate by book id
router.get("/:bookId/:userId", (req, res) => {
    const { bookId, userId } = req.params;
    RatesModel.findOne({ bookId, userId }, (err, data) => {
      if (!err) return res.json(data);
      return res.status(500).json({ Error: "DB_ERR" });
    }).populate("userId");
  });

//update a user rate
router.put("/:id", (req, res) => {
  const { id } = req.params;
  RatesModel.findByIdAndUpdate(
    id,
    {
      rate: req.body.rate,
    },
    (err, data) => {
      if (!err) return res.status(200).json(data);
      return res.status(500).json({ Error: "DB_ERR" });
    }
  );
});

//Delete a user rate
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  RatesModel.findByIdAndDelete(id, (err, data) => {
    if (!err) return res.status(200).json(`One User Deleted`);
    return res.status(500).json({ Error: "DB_ERR" });
  });
});

//Get all rates
router.get("/", (req, res) => {
    RatesModel.find({}, (err, usersData) => {
      if (!err) return res.status(200).json(usersData);
      return res.status(500).json({ Error: "DB_ERR" });
    });
  });


module.exports = router;
