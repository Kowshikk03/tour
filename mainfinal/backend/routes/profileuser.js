const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');


router.get('/profile', authenticateToken, async (req, res) => {
  try {
   

  
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('Server error:', err); // Log server error
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/user/profile
router.put('/profile', authenticateToken, async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    // Find and update the user
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email },
      { new: true, runValidators: true } // Return the updated document and run validators
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error('Server error:', err); // Log server error
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
