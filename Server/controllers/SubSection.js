const subSection = require("../models/SubSection");
const Section = require("../models/Section");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    const { title, description, timeDuration, sectionId } = req.body;
    const video = req.files.videoFile;
    if (!video || !title || !description || !timeDuration) {
      return res.json({
        success: false,
        message: "missing required properties",
      });
    }

    const uploadDetails = await imageUploadToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const subSection = await subSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSection._id,
        },
      },
      { new: true }
    );
    // populate the updateSection
    console.log(updateSection);
    return res.status(200).json({
      success: true,
      message: "SubSection create successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      success: false,
      message: "Error during creating a subSection",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;
    const deleteSubSection = await subSection.findByIdAndDelete(subSectionId);
    return res.status(200).json({
      success: true,
      message: "Subsection delete successfully",
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error during deleting a subSection",
    });
  }
};
