const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token 
                     || req.body.token
                     ||req.header("Authorization")?.split(" ")[1];
       if(!token){
        return res.status(401).json({
            success: false,
            message: "Token is missing"
        });
       }

       try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        console.log("decoded token from Mid-auth file -",decode);

        req.user = decode;
       } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: "Token is invalid"
        });
       }

       next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })       
    }
}


exports.isStudent = async (req, res) => {
    try {
        if(req.user.accountType !== "student") {
                return res.status(401).json({
                    success: false,
                    message: "You are not a student",
                })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannnot verified",
        })
    }
}

exports.isInstructor = async (req, res) => {
    try {
        if(req.user.accountType !== "instructor") {
                return res.status(401).json({
                    success: false,
                    message: "You are not a instructor",
                })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannnot verified",
        })
    }
}

exports.isAdmin = async (req, res) => {
    try {
        if(req.user.accountType !== "admin") {
                return res.status(401).json({
                    success: false,
                    message: "You are not a admin",
                })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannnot verified",
        })
    }
}

// exports.refreshToken = (req, res) => {
//     const refreshToken = req.cookies.refreshToken;

//     if (!refreshToken) {
//         return res.status(401).json({
//             success: false,
//             message: "Refresh token is missing",
//         });
//     }

//     try {
//         // Verify the refresh token
//         const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
//         // Create a new access token
//         const newAccessToken = jwt.sign(
//             { id: decoded.id },
//             process.env.JWT_SECRET,
//             { expiresIn: "15m" }
//         );

//         return res.status(200).json({
//             success: true,
//             accessToken: newAccessToken,
//         });
//     } catch (error) {
//         return res.status(403).json({
//             success: false,
//             message: "Invalid or expired refresh token",
//         });
//     }
// };


// Role Verification Middleware
exports.checkRole = (role) => {
    return (req, res, next) => {
        try {
            if (req.user.accountType !== role) {
                return res.status(403).json({
                    success: false,
                    message: `You are not authorized as a ${role}`,
                });
            }
            next(); // User is authorized, proceed
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "User role could not be verified",
            });
        }
    };
};

// Usage Example
exports.isStudent = exports.checkRole("student");
exports.isInstructor = exports.checkRole("instructor");
exports.isAdmin = exports.checkRole("admin");
