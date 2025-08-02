const router = require('express').Router();
const {registerUser, loginUser, verifytoken} = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');

//Register
router.post('/register', registerUser);

//Login
router.post('/login', loginUser);

//Verify
router.get('/verify',  verifytoken);

module.exports = router;