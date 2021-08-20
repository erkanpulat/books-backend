const { body } = require("express-validator");

// create / update category
const validateCategory = () => {
  return [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Kategori ismi en az 2 karakter olmalıdır.")
      .isLength({ max: 50 })
      .withMessage("Kategori ismi en fazla 50 karakter olmalıdır."),
  ];
};

// create / update book
const validateBook = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Kitap ismi en az 1 karakter olmalıdır.")
      .isLength({ max: 50 })
      .withMessage("Kitap ismi en fazla 50 karakter olmalıdır."),

    body("author")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Yazar ismi en az 2 karakter olmalıdır.")
      .isLength({ max: 50 })
      .withMessage("Yazar ismi en fazla 50 karakter olmalıdır."),

    body("price")
      .isNumeric()
      .withMessage("Kitap fiyatı sayısal değer olmalıdır."),

    body("stock").isNumeric().withMessage("Kitap stoğu sayısal değer olmalıdır."),

    body("category")
      .notEmpty()
      .withMessage("Kitap kategorisi girilmesi zorunludur."),
  ];
};

module.exports = {
  validateCategory,
  validateBook,
};
