const Section = require("../models/Section");
const Course = require("../models/Course");
const { json } = require("express");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing section name or course id",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updateCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection"
      }
    }).exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      course: updateCourseDetails
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error during creating section",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName } = req.body;
    const { sectionId } = req.params;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing section name or section id",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: updatedSection
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating section",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const deletedSection = await Section.findByIdAndDelete(sectionId);

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted section",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting section",
    });
  }
};

