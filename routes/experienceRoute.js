
const router = require('express').Router();
const { getExperience, addExperience, getExperienceById, updateExperience, deleteExperience } = require('../controllers/experienceCtrl');

// Experience routes

// get experience
router.get('/experience', getExperience);

//add experience
router.post('/experience', addExperience);

//get experience by id
router.get('/experience/:id', getExperienceById);

//update experience
router.put('/experience/update/:id', updateExperience);

//delete experience
router.delete('/experience/:id', deleteExperience);

module.exports =router