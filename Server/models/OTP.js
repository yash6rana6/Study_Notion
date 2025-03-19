const mongoose = require('mongoose');
const  mailSender  = require('../utils/mailSender');


const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5  // Document expires in 5 minutes
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        await mailSender(email, "Verification Email from StudyNotion", `Your Login Code is :${otp}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}

OTPSchema.pre('save', async function(next) {
    if (this.isNew) { 
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model('OTP', OTPSchema);
