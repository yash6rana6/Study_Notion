const express = require('express');
const router = express.Router();

const { createCourse, getAllCourses } = require('../controllers/Course');
const { createRating, getAverageRating, getAllRating } = require('../controllers/RatingAndReviews');
const { auth, isStudent, isAdmin, isInstructor } = require('../middleware/auth');
const { createTags, getAllCategory, categoryPageDetails } = require('../controllers/Category');
const { createSection, deleteSection, updateSection } = require('../controllers/Section');
const { createSubSection, deleteSubSection } = require('../controllers/SubSection');

// Course routes
router.post('/createCourse', auth, isInstructor, createCourse);
router.get('/getAllCourses', getAllCourses);

// Rating routes
router.post('/createRating', auth, isStudent, createRating);
router.get('/getAverageRating/:courseId', getAverageRating);
router.get('/getAllRatings', getAllRating);

// Category routes
router.post('/createTags', auth, isAdmin, createTags);
router.get('/getAllCategory', getAllCategory);
router.get('/categoryPageDetails/:categoryId', categoryPageDetails);

// Section routes
router.post('/createSection', auth, isInstructor, createSection);
router.delete('/deleteSection/:sectionId', auth, isInstructor, deleteSection);
router.put('/updateSection/:sectionId', auth, isInstructor, updateSection);

// SubSection routes
router.post('/createSubSection', auth, isInstructor, createSubSection);
router.delete('/deleteSubSection/:subSectionId', auth, isInstructor, deleteSubSection);

module.exports = router;
