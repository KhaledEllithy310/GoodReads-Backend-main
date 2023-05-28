const { response } = require("express");
const express = require("express")
const router= express.Router()
const bookModel = require("../models/books");



//show list of book 
 const index = (req,res,next)=>{
    bookModel.find()
    .populate("categoryId")
    .populate("authorId")
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'an error occured!'
        })
    })
 }
//show single book
 const show = (req,res,next) =>{
     let bookId = req.body.bookId
    // const {id} = id.params
    bookModel.findById(bookId)
    .populate("categoryId")
    .populate("authorId")
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: "an error occured!"
        })
    })
 }


//add new book 
 const store = (req,res,next)=>{
const book = new bookModel({
            
    title :req.body.title,
    description : req.body.description,
    categoryId : req.body.categoryId,
    authorId : req.body.authorId


})
if(req.file){
 book.image = req.file.path
}
book.save()
.then(response =>{
    res.json({
        message : 'book add successfully'
    })
})
.catch(error =>{
    res.json({
        message: 'an error iccured'
    })
})
 }


  // update book

  function update(req, res) {
    const { id } = req.params;
    const updatedFields = req.body; // an object containing the updated values
    bookModel.findOne({ _id: id }, (err, book) => {
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
    bookModel.findByIdAndRemove(bookId)
    .then(()=>{
        res.json({
            message: 'book deleted successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'an error occured!'
        })
    })
 }
 module.exports ={
    index, show, store, update , destroy
 }