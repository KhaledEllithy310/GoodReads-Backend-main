const express = require("express");
const router = express.Router();
const authorModel = require("../controller/author");
const upload = require("../middleware/uploads");


//ROUTES
router.post("/", upload("assets/author_up"), authorModel.create);
router.get("/", authorModel.getAll);
router.patch("/:id", authorModel.getById);
router.put("/:id", upload("assets/author_up"), authorModel.updateById);
router.delete("/:id", authorModel.deleteById);
router.get("/:val", authorModel.search);

module.exports = router;
