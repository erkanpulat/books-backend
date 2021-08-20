const router = require("express").Router();
// controller
const categoryController = require("../controllers/category_controller");
// middlewares
const validatorMiddleware = require("../middlewares/validation_middleware");

// get category list - api/category
router.get("/", categoryController.getCategories);

// get category by id - api/category/:categoryId
router.get("/:categoryId", categoryController.getCategory);

// create category - api/category
router.post(
  "/",
  [validatorMiddleware.validateCategory()],
  categoryController.createCategory
);

// update category by id - api/category/:categoryId
router.put(
  "/:categoryId",
  [validatorMiddleware.validateCategory()],
  categoryController.updateCategory
);

// delete category by id - api/category/:categoryId
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
