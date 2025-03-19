const ratingAndReviews = require("../models/RatingAndReview");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;
    // Ye Hai AAm Zindgi
    //    const courseDetails = await Course.findById(courseId);
    //    const enrolledStudent = courseDetails.studentEnrolled.includes(userId);

    // Ye Hai mentos zindgi
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "User is not enrolled in this course",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Course is already reviewed",
      });
    }

    const ratingAndReview = await RatingAndReview.create({
      rating,
      review,
      user: userId,
    });

    const updateCourseDetails = await Course.findById(
      courseId,
      {
        $push: {
          ratingsAndReviews: ratingAndReview._id,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Rating and reviews created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error while creating rating and reviews",
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    res.status(200).json({
      success: false,
      message: "No rating is available yet",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching average rating",
    });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const rating = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName,lastName,email,image",
      })
      .populate({
        path: "course",
        select: "courseName",
      }).exec()

      return res.status(200).json({
        success: true,
        message: "All ratings fetched successfully",
        data:rating,
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching all ratings",
    });
  }
};
