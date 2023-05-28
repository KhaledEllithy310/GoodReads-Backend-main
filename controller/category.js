const categoryModel = require("../models/category");

//CREATE OBJECT OF DATA IN DATABASE
function create(req, res) {
  categoryModel.create({ ...req.body }, (err, category) => {
    if (!err) return res.json(category);
    res.json({ Error: "DB_ERR" });
  });
}

//DISPLAY ALL DATA FROM DATABASE
function getAll(req, res) {
  categoryModel.find((err, category) => {
    if (!err) return res.status(200).json(category);
    res.status(500).json({ Error: "DB_ERR" });
  });
}

//UPDATE DATA IN DATABASE BY ID
function updateById(req, res) {
  const id = req.params.id;
  categoryModel.updateOne({ _id: id }, req.body, (err, category) => {
    if (!err) return res.status(200).json(category);
    res.status(500).json({ Error: "DB_ERR" });
  });
}

//DELETE DATA FROM DATABASE BY ID
function deleteById(req, res) {
  const id = req.params.id;
  categoryModel.deleteOne({ _id: id }, (err, category) => {
    if (!err) return res.status(200).json(category);
    res.status(500).json({ Error: "DB_ERR" });
  });
}

module.exports = {
  create,
  getAll,
  updateById,
  deleteById,
};
