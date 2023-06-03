const express = require("express");
const router = express.Router();
// const bookModel = require("../models/books");
const upload = require("../middleware/uploads");
const bookController = require("../controller/books");
// const fs = require('fs');
// const path = require("path")

// get all books
router.get("/", bookController.index);
router.get("/show/:id", bookController.show);
router.put("/:id", upload("assets/books_up"), bookController.update);
router.post("/delete", bookController.destroy);
router.post("/store", upload("assets/books_up"), bookController.store);
router.get("/:val", bookController.search);

module.exports = router;
