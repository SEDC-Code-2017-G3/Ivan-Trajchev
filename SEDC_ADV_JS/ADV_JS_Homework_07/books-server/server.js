const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {
    res.sendFile("index.html", {
        root: __dirname + "/public"
    });
});

const apiRouter = express.Router();

apiRouter.get("/books", (req, res) => {

    let sortOrder = req.query["sortby"];
    let showOnPage = req.query["showonpage"] || 30;

    fs.readFile("data/books.json", {
        encoding: 'utf8'
    }, (err, data) => {
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
            books: books.slice(0, showOnPage),
            total: books.length
        }));
    });
})

apiRouter.post("/books", (res, req) => {
    let test = req.body
    console.log(body);
    res.send("");
});

apiRouter.get("/books/title", (req, res) => {
    fs.readFile("data/books.json", {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            console.error("ERROR is: ", err);
            return;
        }

        let books = JSON.parse(data);
        let titles = books.map(book => book.title);
        res.send(JSON.stringify(titles));
    });
})

apiRouter.get("/books/author", (req, res) => {
    fs.readFile("data/books.json", {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            console.error("ERROR is: ", err);
            return;
        }

        let books = JSON.parse(data);
        let authors = books.map(book => book.author);
        res.send(JSON.stringify(authors));
    });
})


app.use("/api", apiRouter);


app.listen(8080, () => console.log('Example app listening on port 8080!'));