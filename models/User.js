const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // GrowTrack gamification fields
  growthPoints: {
    type: Number,
    default: 0 // Total GP earned
  },
  currentLevel: {
    type: Number,
    default: 0 // Plant level (0-4: Seed to Tree)
  },
  currentStreak: {
    type: Number,
    default: 0 // Current daily streak
  },
  longestStreak: {
    type: Number,
    default: 0 // Longest streak achieved
  },
  lastCompletionDate: {
    type: Date,
    default: null // Last task completion date for streak calculation
  },
  achievements: [{
    type: {
      type: String,
      enum: ['first_bloom', 'seven_day_growth', 'forest_creator', 'streak_master', 'productivity_hero']
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  }],
  plants: [{
    type: {
      type: String,
      enum: ['flower', 'tree', 'bush', 'cactus', 'herb', 'dog', 'cat', 'bird', 'fish', 'rabbit', 'hamster']
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
