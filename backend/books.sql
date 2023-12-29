-- Create and use the 'books' database if it doesn't exist
CREATE DATABASE IF NOT EXISTS books;
USE books;

-- Create the 'books' table
DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `author` varchar(40) NOT NULL,
  `genre` varchar(20) NOT NULL,
  `publication_year` int NOT NULL,
  PRIMARY KEY (`id`)
);

-- Insert data into the 'books' table
INSERT INTO `books` (`title`, `author`, `genre`, `publication_year`)
VALUES
  ('Book 1', 'Author 1', 'Fiction', 2020),
  ('Book 2', 'Author 2', 'Mystery', 2019),
  ('Book 3', 'Author 3', 'Science Fiction', 2021);
