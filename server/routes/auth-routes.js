const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const { signToken } = require('../utils/auth');
const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists' });

      user = new User({ username, email, password });
      await user.save();

      const token = signToken(user);
      res.json({ token });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const token = signToken(user);
      res.json({ token });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
