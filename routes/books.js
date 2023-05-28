const express = require("express")
const router= express.Router()
const bookModel = require("../models/books");
const upload = require("../middleware/upload")
const bookController = require('../controllers/books')
const fs = require('fs');
const path = require("path")

// get all books
router.get('/',bookController.index)
router.get('/show',bookController.show)
router.put('/:id',upload,bookController.update)
router.post('/delete', bookController.destroy)
router.post('/store',upload,bookController.store)
    






module.exports = router  