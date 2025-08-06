const router = require('express').Router();
const { registerUser, loginUser, verifytoken } = require('../controllers/userCtrl');
const auth = require('../middlewares/auth'); // If you want to protect routes

// @route   POST /user/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /user/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);

// @route   GET /user/verify
// @desc    Verify JWT token and return user info
// @access  Protected
router.get('/verify', verifytoken);  


module.exports = router;