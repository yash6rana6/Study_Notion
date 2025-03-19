const mongoose = require("mongoose");
// const { resetPasswordTokewen } = require("../controllers/ResetPassword");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ["Admin", "Student", "Instructor"],
  },

  additionalDetails: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Profile",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  ],

  token:{
    type: String,
  },
  resetPasswordExpires:{
    type: Date,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "CourseProgress",
    },
  ],
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
