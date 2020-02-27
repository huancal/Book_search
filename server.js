const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000; 
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const db = require("./models");


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
    
});

// connection to mongodb

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/book";
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
        if (err) throw err;
        console.log("database connected")
    })
    .then(() => console.log("Database Connected!"))
    .catch(err => console.log(err));


// API route

    app.get("/search/:search", (req, res) => {
        let search = req.params.search;
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search).then(function(response) {
            let books = response.data.items
            // console.log(books)
            let array =[];
            for(let i=0; i<books.length; i++) {
              if(books[i].volumeInfo.imageLinks !== undefined && books[i].volumeInfo.authors !== undefined){
              let bookInfo = {
                    title: books[i].volumeInfo.title,
                    authors: books[i].volumeInfo.authors,
                    description: books[i].volumeInfo.description,
                    image: books[i].volumeInfo.imageLinks.smallThumbnail,
                    link: books[i].volumeInfo.infoLink
                }
              array.push(bookInfo);  
            }}
            db.Book
                  .create(array)
                  .then(dbBook => res.json(dbBook))
                  .catch(err => res.json(err))
          })
      })
      //get all saved books from db
      app.get("/api/books", (req, res) => {
        db.Book
          .find({saved: true})
          .then(dbBook => res.json(dbBook))
          .catch(err => res.json(err))
      })
      //save a book to db
      app.post("/api/books/:id", (req, res)  => {
        db.Book
          .findOneAndUpdate({_id: req.params.id}, {saved: true}, {new: true})
          .then(dbBook => {
            res.json(dbBook)
          })
      })
      //delete all unsaved books from db
      app.delete("/api/books", (req, res) => {
        db.Book
          .deleteMany({saved: false})
          .then(dbBooks => res.json(dbBooks))
      })
      //delete a book from db /api/books/:id
      app.delete("/api/books/:id", (req, res) => {
        db.Book
          .deleteOne({_id: req.params.id})
          .then(dbBook => res.json(dbBook))
      })
      
  
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
      });
