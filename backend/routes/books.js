const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');
//route with post method for creating a new book
router.post('/books',bookController.createBook);
//route with get method for displaying all books from db
router.get('/books',bookController.getAllBooks);
//route with get method for retrieving details of a book record from id
router.get('/books/:id',bookController.getBookById);
//route with put method to update a record by passing its id 
router.put('/books/:id',bookController.updateBook);
//delete method route with id of the book that has to be deleted.
router.delete('/books/:id',bookController.deleteBook);

module.exports = router;