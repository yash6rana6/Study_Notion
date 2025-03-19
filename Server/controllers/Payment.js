const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const { default: mongoose } = require("mongoose");
const Razorpay = require("razorpay");

exports.capturePayment = async (req, resizeBy) => {
  try {
    const { courseId } = req.body;
    const userId = req.body.user;
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);
    if (!courseId) {
      return res.json({
        success: false,
        message: "Course id not found",
      });
    }

    if (!user || !course) {
      return res.json({
        success: false,
        message: "User or course not found",
      });
    }

    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentEnrolled.includes(uid)) {
      return res.json({
        success: false,
        message: "User is already enrolled in this course",
      });
    }

    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency: currency,
      description: "Payment for course",
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course._id,
        userId,
      },
    };

    try {
      const PaymentResponse = await instance.orders.create(options);
      console.log(PaymentResponse);
      return res.status(200).json({
        success: true,
        message: "Payment created successfully",
        paymentId: PaymentResponse.id,
        amount,
        currency,
        courseId,
        userId,
        userEmail: user.email,
        courseTitle: course.title,
        coursePrice: course.price,
        courseInstructor: course.instructor.name,
        courseInstructorEmail: course.instructor.email,
        courseDuration: course.duration,
        courseDescription: course.description,
        courseCreatedAt: course.createdAt,
        courseStudentEnrolled: course.studentEnrolled,
        courseStudentEnrolledCount: course.studentEnrolled.length,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error while creating payment",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webHookSecret = "12345678";
  const signature = req.headers["x-razorpay-signature"];

  try {
    const shasum = crypto.createHmac("sha256", webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const expectedSignature = shasum.digest("hex");

    if (signature === expectedSignature) {
      console.log("Payment is authorized");
    } else {
      console.error("Invalid webhook signature");
      res.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    const { courseId, userId } = req.body.payload.payment.entity.notes;
    const enrolledCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: {
          studentEnrolled: userId,
        },
      },
      { new: true }
    );

    const enrolledStudent = await Course.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          courses: courseId,
        },
      },
      { new: true }
    );

    const emailSender = await mailSender(
      enrolledStudent.email,
      "Course Enrollment",
      `Congratulations! You have successfully enrolled in the course "${enrolledCourse.title}".`
    );

    res.status(200).json({
      success: true,
      message: `Student Enrolled successfully in the course ${enrolledCourse.title}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
