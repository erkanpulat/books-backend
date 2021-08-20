const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// model
const Category = require("./Category");

const BookSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
    picture:{
      type: String,
      trim: true,
      default: "default_book.png",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
  },
  {
    collection: "books",
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
