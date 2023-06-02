const authorModel = require("../models/author");

//CREATE OBJECT OF DATA IN DATABASE
function create(req, res) {
  let newAuthor = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dateOfBirth: req.body.dateOfBirth,
  };
  if (req.file) {
    newAuthor["avatar"] = req.file.path;
    console.log(newAuthor);
  }

  authorModel.create(newAuthor, (err, newAuthor) => {
    if (!err) return res.json(newAuthor);
    res.json({ Error: "DB_ERR" });
    console.log(newAuthor);
  });
}

//DISPLAY ALL DATA FROM DATABASE
function getAll(req, res) {
  authorModel.find((err, author) => {
    if (!err) return res.status(200).json(author);
    res.status(500).json({ Error: "DB_ERR" });
    console.log(author);
  });
}

//DISPLAY AUTHOR BY ID FROM DATABASE
function getById(req, res) {
  const id = req.params.id;
  authorModel.findOne({ id }, req.body, (err, author) => {
    if (!err) return res.status(200).json(author);
    res.status(500).json({ Error: "DB_ERR" });
  });
}

//DELETE DATA FROM DATABASE BY ID
function deleteById(req, res) {
  const id = req.params.id;
  authorModel.deleteOne({ _id: id }, (err, author) => {
    if (!err) return res.status(200).json(author);
    res.status(500).json({ Error: "DB_ERR" });
  });
}

//UPDATE DATA OF AUTHOR BY ID
function updateById(req, res) {
  const { id } = req.params;
  const updatedFields = req.body; // an object containing the updated values
  authorModel.findOne({ _id: id }, (err, author) => {
    if (err) {
      return res.status(500).json({ Error: "DB_ERR" });
    }
    if (!author) {
      return res.status(404).json({ Error: "AUTHOR_NOT_FOUND" });
    }
    // update the author object with the new values
    Object.assign(author, updatedFields);
    author.save((err, updatedAuthor) => {
      if (err) {
        return res.status(500).json({ Error: "DB_ERR" });
      }
      res.status(200).json(updatedAuthor);
    });
  });
}

 //search books
 const search = (req, res, next) => {
  const { val } = req.params;
  authorModel.find({
    $or: [
      { first_name: { $regex: `.*${val}.*`, $options: "i" } },
      { last_name: { $regex: `.*${val}.*`, $options: "i" } }
    ]
  }, (err, data) => {
    if (!err) return res.json(data);
    return res.status(500).json({ Error: "DB_ERR" });
  });
};


module.exports = {
  create,
  getAll,
  deleteById,
  getById,
  updateById,
  search
};
