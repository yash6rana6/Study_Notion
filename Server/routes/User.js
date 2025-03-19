
const express = require('express');
const router = express.Router();

const { sendotp, signup, login, changePassword } = require('../controllers/Auth');
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword');
const { auth,  refreshToken } = require('../middleware/auth');

// Password Reset Routes
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);

// Authentication Routes
router.post('/sendotp', sendotp);
router.post('/signup', signup);
router.post('/login', login);
router.post('/changepassword', auth, changePassword);
// router.get('/refresh-token', refreshToken);

module.exports = router;
