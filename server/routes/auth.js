const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/protected-route', protect, (req, res) => {
  res.json({ message: 'Welcome, authorized user!' });
});

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

