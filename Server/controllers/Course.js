const Course = require("../models/Course");
const User = require("../models/User");
const Tag = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, price, tag, whatYouWillLearn } =
      req.body;
    const thumbnail = req.files.thumbnailImage;

    if (
      !tag ||
      !courseName ||
      !courseDescription ||
      !price ||
      !whatYouWillLearn
    ) {
      return res.json({
        success: false,
        message: "All fileds are required",
      });
    }

    const userId = req.user.id;
    const instructorDetails = await User.findById({ userId });
    console.log(instructorDetails);

    if (!instructorDetails) {
      return res.json({
        success: false,
        message: "Instructor not found",
      });
    }

    const tagDetail = await Tag.findById({ tag });
    if (!tagDetail) {
      return res.json({
        success: false,
        message: "Tag not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tagDetail._id,
    });

    await User.findById(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      }
    );

    await Tag.findById(
      { _id: tagDetail._id },
      {
        $push: {
          courses: newCourse._id,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      success: false,
      message: "Error during creating course",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  const { courseId } = req.body;

  const allCoursesDetails = await Courses.find(
    { _id: courseId }.populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("Category")
    .populate("ratingAndReviews")
    .populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    })

    
  );
  if(!allCoursesDetails){
      return res.json({
        sucess:false,
        message:"Course not found"
      })
  }

  return res.status(200).json({
    success:true,
    message:"Course Details Fetched Succesfully",
    data:allCoursesDetails
  })
};
