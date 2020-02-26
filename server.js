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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/book";
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
        if (err) throw err;
        console.log("database connected")
    })
    .then(() => console.log("Database Connected!"))
    .catch(err => console.log(err));