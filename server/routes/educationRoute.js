const router = require("express").Router();
const {
  getEducation,
  addEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationCtrl");

// ========== Education Routes ========== //

// @route   GET /education
// @desc    Get all education entries
router.get("/education", getEducation);

// @route   POST /education
// @desc    Add new education entry
router.post("/education", addEducation);

// @route   GET /education/:id
// @desc    Get single education entry by ID
router.get("/education/:id", getEducationById);

// @route   PUT /education/update/:id
// @desc    Update education entry by ID
router.put("/education/update/:id", updateEducation);

// @route   DELETE /education/:id
// @desc    Delete education entry by ID
router.delete("/education/:id", deleteEducation);

module.exports = router;
