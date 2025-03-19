const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
             host: 'smtp.gmail.com',
            port: process.env.EMAIL_PORT || 587,
            secure: process.env.EMAIL_PORT === '465',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion || CodeRed - by WhiteNight',
            to: email,
            subject: title,
            html: body,
        });

        console.log('Message sent: i%s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = mailSender;
