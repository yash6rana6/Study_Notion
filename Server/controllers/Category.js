const User = require("../models/User");
const Category = require("../models/Category");

exports.createTags = async (req, res) => {
  try {
    const { name, desription } = req.body;

    if (!name || !desription) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const tag = await Category.create({ name, desription });
    console.log("category controller tag",tag);
    res.json({
      success: true,
      message: "Tag created successfully",
      tag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create tag",
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );
    res.json({
      success: true,
      message: "All category fetched successfully",
      allCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all category",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = Category.findById(categoryId)
      .populate("courses")
      .exec();

    if (!selectedCategory) {
      return res.json({
        success: false,
        message: "Data not found",
      });
    }

    const differentCategory = Category.findOne({_id:{ $ne: categoryId }})
      .populate("courses")
      .exec();


    const allCategories = Category.find().populate('courses');
    const allCourse = (await allCategories).flatMap((category) =>{
      category.course
    })

    const mostSellingCourses = allCourse.sort((a,b) => b.sold - a.sold)
                                                      .slice(0, 10);
      res.status(200).json({
        success: true,
        message: "Category page details fetched successfully",
        selectedCategory,
        differentCategory,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category page details",
    });
  }
};
