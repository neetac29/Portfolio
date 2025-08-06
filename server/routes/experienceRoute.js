const router = require('express').Router();
const {
    getExperience,
    addExperience,
    getExperienceById,
    updateExperience,
    deleteExperience
} = require('../controllers/experienceCtrl');

// ========== Experience Routes ========== //

// @route   GET /experience
// @desc    Get all experience entries
router.get('/experience', getExperience);

// @route   POST /experience
// @desc    Add a new experience entry
router.post('/experience', addExperience);

// @route   GET /experience/:id
// @desc    Get a specific experience entry by ID
router.get('/experience/:id', getExperienceById);

// @route   PUT /experience/update/:id
// @desc    Update a specific experience entry by ID
router.put('/experience/update/:id', updateExperience);

// @route   DELETE /experience/:id
// @desc    Delete a specific experience entry by ID
router.delete('/experience/:id', deleteExperience);

module.exports = router;
