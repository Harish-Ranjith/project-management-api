const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // <--- Import this

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // <--- Add 'protect' here

module.exports = router;