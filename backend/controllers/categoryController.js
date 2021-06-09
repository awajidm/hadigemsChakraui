const slugify = require("slugify");

const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const Category = require("../models/category");

//creating category List

function createCategoryList(categories, parentId = null) {
  const categoryList = [];
  let category;

  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategoryList(categories, cate._id),
    });
  }

  return categoryList;
}

//create new Category /api/v1/admin/category/new
exports.newCategroy = catchAsyncErrors(async (req, res, next) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cateogry = await Category.create(categoryObj);

  res.status(201).json({
    success: true,
    cateogry,
  });
});

//get all categories /api/v1/categories

exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  if (categories) {
    // const categoryList = createCategoryList(categories);

    res.status(200).json({
      success: true,
      categories,
    });
  }
});

//get single category /api/v1/category/:id
exports.getSingleCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate({
    path: "parentId",
    populate: {
      path: "parentId",
      populate: {
        path: "parentId",
        populate: {
          path: "parentId",
        },
      },
    },
  });
  if (!category) {
    return next(new ErrorHandler("No category with this id", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

//Delete category /api/v1/admin/category/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("No category with this id", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
  });
});

//update category /api/v1/admin/category/:id
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("category not found!", 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    category,
  });
});
