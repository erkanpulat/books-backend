const router = require("express").Router();
// controller
const bookController = require("../controllers/book_controller");
// middlewares
const validatorMiddleware = require("../middlewares/validation_middleware");
// config
const multerConfig = require("../config/multer_config");

// get book list - api/book
router.get("/", bookController.getBooks);

// get book by id - api/book/:bookId
router.get("/:bookId", bookController.getByBookId);

// get book by category id - api/book/category/:categoryId
router.get("/category/:categoryId", bookController.getByCategoryId);

// create book - api/book
router.post(
  "/",
  [validatorMiddleware.validateBook()],
  bookController.createBook
);

// update book by id - api/book/:bookId
router.put(
  "/:bookId",
  [
    multerConfig.imageUpload.single("picture"),
    validatorMiddleware.validateBook(),
  ],
  bookController.updateBook
);

// delete book by id - api/book/:bookId
router.delete("/:bookId", bookController.deleteBook);

module.exports = router;
