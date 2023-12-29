const config = require("../config/config.js");
const mysql = require('mysql2');
const fs = require('fs');
const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
});

//connecting to database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database', err);
    return;
  }
  console.log('Connected to the database');

//creating database if doesnot exists
  db.query('CREATE DATABASE IF NOT EXISTS books', (err) => {
    if (err) {
      console.error('Error creating or using the database', err);
      return;
    }

    console.log('Database created/used');
 //populating with some dummy data from books.sql file 
    const sqlFile = fs.readFileSync('./books.sql', 'utf-8');
    const sqlStatements = sqlFile.split(';');

    db.query('USE books', (err) => {
      if (err) {
        console.error('Error using the database', err);
        return;
      }
//making sql queries to create db tablw with some default entries for testing
      sqlStatements.forEach((statement) => {
        if (statement.trim()) {
          db.query(statement, (err) => {
            if (err) {
              console.error('Error executing SQL statement', err);
              return;
            }
          });
        }
      });

      console.log('Database schema and data setup completed.');
    });
  });
});
//export fun for creating a new book with a 'book' object parameter and callback parameter which has to be defined
exports.createBook = (book,callback)=>{
  db.query(
    `INSERT INTO books (title ,author , genre ,publication_year) VALUES ('${book.title}','${book.author}','${book.genre}','${book.publication_year}')`,
    callback
  );
};
//query to fetch all books from table
exports.getAllBooks = (callback)=>{
  db.query('SELECT * FROM books',callback);
};
//query to retrieve book data by id from table
exports.getBookById = (bookId,callback)=>{
  db.query('SELECT * FROM books WHERE id = ?',bookId , (err,result)=>{
    if(err){
      callback(err,null);
      return;
    }
    callback(null,result[0]);
  });
};
//query to update an existing entry
exports.updateBook = (bookId,updatedBook,callback) =>{
  db.query('UPDATE books SET ? WHERE id = ?',[updatedBook,bookId],callback);
};
//query to delete a book
exports.deleteBook = (bookId,callback) =>{
  db.query('DELETE FROM books WHERE id = ?',bookId,callback);
};