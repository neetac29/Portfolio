const { getProject, addProject, getProjectById, updateProject, deleteProject } = require('../controllers/projectCtrl');

const router = require('express').Router();

//Project Routes

//get project
router.get('/project', getProject);

// add project
router.post('/project', addProject);

//get project by id
router.get('/project/:id', getProjectById);

//update project
router.put('/project/update/:id', updateProject);

//delete project
router.delete('/project/:id', deleteProject);

module.exports = router;