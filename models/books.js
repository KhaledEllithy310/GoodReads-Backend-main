const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({

    title: 
    { 
      type: String ,
      required:true
    
    },
    description:{
        type: String ,
        required:true
    },
    avatar:{
      type :String 
    },
    categoryId: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "categories",
     
    },
    authorId: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: true
    } 
     
    

});

const booksModel = mongoose.model("books", booksSchema);
module.exports = booksModel;