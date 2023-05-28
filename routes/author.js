const express = require("express");
const router = express.Router();
const authorModel = require("../controller/author");
const upload = require("../middleware/uploads");


//ROUTES
router.post("/", upload, authorModel.create);
router.get("/", authorModel.getAll);
router.get("/:id", authorModel.getById);
router.put("/:id", upload, authorModel.updateById);
router.delete("/:id", authorModel.deleteById);
module.exports = router;
