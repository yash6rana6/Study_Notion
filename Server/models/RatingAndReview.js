const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    review:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('RatingAndReview', ratingAndReviewSchema);