const mongoose = require('mongoose');
const Course = require('./Course');

const tagsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Course,
        required: true,
    },
})

module.exports = mongoose.model('Tag', tagsSchema);
