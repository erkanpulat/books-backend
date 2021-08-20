const Category = require("../models/Category");
const Response = require("../Response");
const { validationResult } = require("express-validator");

// get category list - api/category
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();
    return new Response(categories, null).success(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// get category by id - api/category/:categoryId
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId).lean();
    return category
      ? new Response(category, null).success(res)
      : new Response().notFound(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// create category - api/category
const createCategory = async (req, res, next) => {
  const errors = Array.from(validationResult(req).array());
  if (errors.length > 0) return new Response(null, errors).badRequest(res);
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    return new Response(newCategory, null).created(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// update category by id - api/category/:categoryId
const updateCategory = async (req, res, next) => {
  const errors = Array.from(validationResult(req).array());
  if (errors.length > 0) return new Response(null, errors).badRequest(res);
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      {
        new: true,
      }
    );
    return category
      ? new Response(category, null).success(res)
      : new Response().notFound(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

// delete category by id - api/category/:categoryId
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.categoryId);
    return category
      ? new Response(category, null).success(res)
      : new Response().notFound(res);
  } catch (error) {
    return new Response(null, error).internalServer(res);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
