const mongoose = require("mongoose");

const book_schema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    enum: ["Fiction", "Science", "Comic"],
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("book", book_schema);

module.exports = { Book };
