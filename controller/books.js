// const { response } = require("express");
// const express = require("express")
// const router= express.Router()
const booksModel = require("../models/books");



//show list of book 
 const index = (req,res,next)=>{
    booksModel.find()
    .populate("categoryId")
    .populate("authorId")
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'an error occurred!'
        })
    })
 }
//show single book
 const show = (req,res,next) =>{
    const { id } = req.params;
    // const {id} = id.params
    booksModel.findById(id)
    .populate("categoryId")
    .populate("authorId")
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: "an error occurred!"
        })
    })
 }


//add new book 
 const store = (req,res,next)=>{
const book = new booksModel({
            
    title :req.body.title,
    description : req.body.description,
    categoryId : req.body.categoryId,
    authorId : req.body.authorId
})
if(req.file){
 book.avatar = req.file.path
}
book.save()
.then(response =>{
    res.json({
        message : 'book add successfully'
    })
})
.catch(error =>{
    res.json({
        message: 'an error accrued'
    })
})
 }


  // update book

  function update(req, res) {
    const { id } = req.params;
    const updatedFields = req.body; // an object containing the updated values
    booksModel.findOne({ _id: id }, (err, book) => {
      if (err) {
        return res.status(500).json({ Error: "DB_ERR" });
      }
      if (!book) {
        return res.status(404).json({ Error: "Book_NOT_FOUND" });
      }
      // update the author object with the new values
      Object.assign(book, updatedFields);
    book.save((err, updatedBook) => {
      if (err) {
        return res.status(500).json({ Error: "DB_ERR" });
      }
      res.status(200).json(updatedBook);
    });
  });
}

















 //delete an book 
 const  destroy = (req,res,next)=>{
    let bookId = req.body.bookId
    booksModel.findByIdAndRemove(bookId)
    .then(()=>{
        res.json({
            message: 'book deleted successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'an error occurred!'
        })
    })
 }
 module.exports ={
    index, show, store, update , destroy
 }