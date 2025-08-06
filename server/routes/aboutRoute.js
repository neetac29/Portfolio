const router = require("express").Router();
const {
  getAbout,
  addAbout,
  getAboutById,
  updateAboutById,
  deleteAbout,
} = require("../controllers/aboutCtrl");

// ========== About Routes ========== //

// @route   GET /about
// @desc    Get all about entries
router.get("/about", getAbout);

// @route   POST /about
// @desc    Add a new about entry
router.post("/about", addAbout);

// @route   GET /about/:id
// @desc    Get a specific about entry by ID
router.get("/about/:id", getAboutById);

// @route   PUT /about/update/:id
// @desc    Update a specific about entry by ID
router.put("/about/update/:id", updateAboutById);

// @route   DELETE /about/:id
// @desc    Delete a specific about entry by ID
router.delete("/about/:id", deleteAbout);

module.exports = router;
