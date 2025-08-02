const router = require('express').Router(); 
const { getAbout, addAbout, getAboutById, updateAboutById, deleteAbout } = require('../controllers/aboutCtrl')
/** About  */

//import aboutSchema
//const aboutSchema = require('../models/aboutModels');

//get about 
router.get('/about', getAbout);

// add about 
router.post('/about', addAbout);

//get specific about by id
router.get('/about/:id', getAboutById)

// update specific about by id
router.put('/about/update/:id', updateAboutById)

// delete specific about by id
router.delete('/about/:id', deleteAbout)

module.exports =router