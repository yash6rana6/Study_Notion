const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required: true,
        unique: true
    },
    courseDescription:{
        type: String,
        required: true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    whatYouWillLearn: {
        type: String,
        required: true
    },

    courseContent: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Section'
    },
    ratingAndReview:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RatingandReview'
    },
    price:{
        type: Number,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    tag:{
        type:[String],
        required: true
    },
    sold:{
        type: Number,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    studentEnrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
})

module.exports = mongoose.model('Course', courseSchema);