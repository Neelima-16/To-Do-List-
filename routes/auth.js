const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      res.json({
        _id: user._id,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET user profile
router.get('/profile', require('../middleware/auth').protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST unlock new plant
router.post('/unlock-plant', require('../middleware/auth').protect, async (req, res) => {
  try {
    const { plantType } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has enough GP for plant unlock (every 100 GP unlocks a new plant)
    const requiredGP = (user.plants.length + 1) * 100;
    if (user.growthPoints < requiredGP) {
      return res.status(400).json({ message: `Need ${requiredGP} GP to unlock this plant` });
    }

    // Check if plant type is valid
    const validPlants = ['flower', 'tree', 'bush', 'cactus', 'herb', 'dog', 'cat', 'bird', 'fish', 'rabbit', 'hamster'];
    if (!validPlants.includes(plantType)) {
      return res.status(400).json({ message: 'Invalid plant type' });
    }

    // Check if plant already unlocked
    if (user.plants.some(p => p.type === plantType)) {
      return res.status(400).json({ message: 'Plant already unlocked' });
    }

    // Add new plant
    user.plants.push({ type: plantType });
    await user.save();

    res.json({ message: 'Plant unlocked successfully', plants: user.plants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
