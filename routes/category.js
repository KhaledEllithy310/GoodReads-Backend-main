const express = require("express");
const router = express.Router();
const categoryModel = require("../controller/category");

//ROUTES
router.post("/", categoryModel.create);
router.get("/", categoryModel.getAll);
router.put("/:id", categoryModel.updateById);
router.delete("/:id", categoryModel.deleteById);

module.exports = router;
