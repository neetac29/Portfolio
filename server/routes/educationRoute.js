const router = require('express').Router();
const {getEducation, addEducation, getEducationById, updateEducation, deleteEducation} = require('../controllers/educationCtrl');


// Education route

// get eduction 
router.get('/education', getEducation);

// add eduction 
router.post('/education', addEducation);

// get eduction by id
router.get('/education/:id', getEducationById);

// update eduction 
router.put('/education/update/:id', updateEducation);

// delete eduction 
router.delete('/education/:id', deleteEducation);

module.exports = router