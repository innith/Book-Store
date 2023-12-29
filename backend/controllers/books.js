const db = require('../models/books');

exports.createBook = (req, res) => {
  const book = req.body;//the book object with the property& values of new record to be read from the user input(req.body)
//the callback logic after the query in model gets executed.
  db.createBook(book, (err,results) => {
    if (err) {
      if(!book.title || !book.author || !book.genre || !book.publication_year){//checks if the object has all required properties in order to create a new entry in table.
        console.log('provide all necessary fields.')
        res.status(400).send('provide all necessary fields.');
        return;
      }
      console.error('Error creating book', err);
      res.status(500).send('Error creating book');
      return;
    }
    const insertedId = results.insertId;//keeps track of the id(set to auto incremet - on sql) as the user doesn't provide id in the request body.
    res.status(201);//created
    res.set('Content-Type', 'application/json');
    const response = {
      message: "Book added successfully",
      book: {
        id: insertedId, 
        title: book.title,
        author: book.author,
        genre: book.genre,
        publication_year: book.publication_year
      }
    };
    res.json(response);
  });
};
//controller function with a specified callback to response all books details in table.
exports.getAllBooks = (req, res) => {
  db.getAllBooks((err, books) => {
    if (err) {
      console.error('Error getting books', err);
      res.status(500).send('Error getting books');
      return;
    }
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.json(books); // response with all book documents
  });
};
//export function for setting response to a book details by reading the id from user(req)
exports.getBookById = (req, res) => {
  const bookId = req.params.id;//reading id from url

  db.getBookById(bookId, (err, book) => {
    if (err) {
      
      console.error('Error getting book', err);
      res.status(500).send('Error getting book');
      return;
    }
    if (!book) {
      res.status(404).send('Book not found');
      return;
    }
    res.set('Content-Type', 'application/json');
    res.json(book); //sending the json book as reponse
  });
};
//export function that updates an entry
exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  db.updateBook(bookId, updatedBook, (err, result) => {
    if (err) {
      console.error('Error updating book', err);
      res.status(500).send('Error updating book');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Book not found');
      return;
    }

    db.getBookById(bookId, (err, book) => {
      if (err) {
        console.error('Error getting updated book details', err);
        res.status(500).send('Error getting updated book details');
        return;
      }
      if (!book) {
        res.status(404).send('Book not found');
        return;
      }

      res.set('Content-Type', 'application/json');
      const response = {
        message: 'Book updated successfully',
        book: {
          id: bookId,
          title: book.title,
          author: book.author,
          genre: book.genre,
          publication_year: book.publication_year
        }
      };
      res.json(response);
    });
  });
};

//export function that deletes an entry with handling errors(implemented callback) 
exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  db.deleteBook(bookId, (err, result) => {
    if (err) {
      console.error('Error deleting book', err);
      res.status(500).send('Error deleting book');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Book not found');
      return;
    }
    res.send('Book deleted successfully');
  });
};