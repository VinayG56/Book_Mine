const mongoose = require("mongoose");

const book = new mongoose.Schema(
  {
    url: {
      type: String,
      requied: true,
    },
    title: {
      type: String,
      requied: true,
    },
    author: {
      type: String,
      requied: true,
    },
    bookId: {
      type: String,
      requied: true,
    },
    desc: {
      type: String,
      requied: true,
    },
    language: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("book", book);
