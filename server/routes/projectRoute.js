const router = require('express').Router();
const {
    getProject,
    addProject,
    getProjectById,
    updateProject,
    deleteProject
} = require('../controllers/projectCtrl');

// ========== Project Routes ========== //

// @route   GET /project
// @desc    Get all projects
router.get('/project', getProject);

// @route   POST /project
// @desc    Add a new project
router.post('/project', addProject);

// @route   GET /project/:id
// @desc    Get a specific project by ID
router.get('/project/:id', getProjectById);

// @route   PUT /project/update/:id
// @desc    Update a specific project by ID
router.put('/project/update/:id', updateProject);

// @route   DELETE /project/:id
// @desc    Delete a specific project by ID
router.delete('/project/:id', deleteProject);

module.exports = router;
