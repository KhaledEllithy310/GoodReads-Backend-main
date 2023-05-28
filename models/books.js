const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

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

const bookModel = mongoose.model("books", bookSchema);
module.exports = bookModel;