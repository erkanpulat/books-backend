const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
  },
  { collection: "categories", timestamps: true, versionKey: false }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
