const Book = require("../models/Book");
const Response = require("../Response");
const { validationResult } = require("express-validator");
const multer = require("multer");

// get book list - api/book
const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .populate("category")
      .lean();
    return new Response(books, null).success(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// get book by id - api/book/:bookId
const getByBookId = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId)
      .populate("category")
      .lean();
    return book
      ? new Response(book, null).success(res)
      : new Response().notFound(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// get book by category id - api/book/category/:categoryId
const getByCategoryId = async (req, res, next) => {
  try {
    const book = await Book.find({ category: req.params.categoryId })
      .populate("category")
      .lean();
    return book
      ? new Response(book, null).success(res)
      : new Response().notFound(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// create book - api/book
const createBook = async (req, res, next) => {
  // express-validator errors
  const errors = Array.from(validationResult(req).array());
  // multer file filter error
  if (req.file_error) errors.push({ msg: req.file_error });
  // send a "bad request" if there is an error
  if (errors.length > 0) return new Response(null, errors).badRequest(res);
  try {
    let newBook = new Book(req.body);
    newBook = await newBook.save();
    newBook = await newBook.populate("category").execPopulate();
    return new Response(newBook, null).created(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// update book by id - api/book/:bookId
const updateBook = async (req, res, next) => {
  // express-validator errors
  const errors = Array.from(validationResult(req).array());
  // multer file filter error
  if (req.file_error) errors.push({ msg: req.file_error });
  // send a "bad request" if there is an error
  if (errors.length > 0) return new Response(null, errors).badRequest(res);
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    }).populate("category");
    return book
      ? new Response(book, null).success(res)
      : new Response().notFound(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// delete book by id - api/book/:bookId
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.bookId).populate(
      "category"
    );
    return book
      ? new Response(book, null).success(res)
      : new Response().notFound(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

module.exports = {
  getBooks,
  getByBookId,
  getByCategoryId,
  createBook,
  updateBook,
  deleteBook,
};
