const express = require("express");
const app = express();

const dotenv = require("dotenv");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payment");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/Cloudinary");
const fileUpload = require("express-fileupload");
const { Connect } = require("./config/Database");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Connect to the database
Connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://study-notion-mega-project.vercel.app', 'http://localhost:3000'],
    credentials: true,
  })


);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);

// Connect to Cloudinary
cloudinaryConnect();

// Routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

app.get("/", (req, res) =>
  res.json({
    success: true,
    message: "Welcome to Mega-project",
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
