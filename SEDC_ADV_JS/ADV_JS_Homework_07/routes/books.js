var express = require('express');
var fs = require('fs')

var router = express.Router();

/* GET books listing. */
router.get('/books', (req, res) => {
  let sortOrder = req.query["sortby"];
  let start = parseInt(req.query["start"]) || 0;
  let booksOnPage = parseInt(req.query["showonpage"]) || 30;
  let end = start + booksOnPage;

  fs.readFile("./data/books.json", { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error("ERROR is: ", err);
      return;
    }


    let books = JSON.parse(data);
    if (sortOrder === "author") {
      books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortOrder === "title") {
      books.sort((a, b) => a.title.localeCompare(b.title));
    }

    res.send(JSON.stringify({
      booksOnPage: booksOnPage,
      books: books.slice(start, end),
      total: books.length
    }));
  });
});

//Sort books by title
router.get('/books/title', (req, res) => {
  fs.readFile("./data/books.json", { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error("ERROR is: ", err);
      return;
    }

    let books = JSON.parse(data);
    let titles = books.map(book => book.title);
    res.send(JSON.stringify(titles));
  });
});

//Sort books by author
router.get('/books/author', (req, res) => {
  fs.readFile("./data/books.json", { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error("ERROR is: ", err);
      return;
    }

    let books = JSON.parse(data);
    let authors = books.map(book => book.author); 
    res.send(JSON.stringify(authors));
  });
});
//Handle POST request to add book to books.json
router.post("/books", (req, res) => {
  let book = req.body;
  fs.readFile("./data/books.json", { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error("ERROR is: ", err);
      res.send("Error adding a book.");
      return;
    }
    
    let books = JSON.parse(data);
    books.push(book);
    
    fs.writeFile("./data/books.json", JSON.stringify(books, null, 2), (err) => {
      if (err) {
        console.error("ERROR is: ", err);
        res.send("Error adding a book.");
        return;
      }else{
        res.send("Sucessfuly added new book!");
      }
    });
  })
});

module.exports = router;