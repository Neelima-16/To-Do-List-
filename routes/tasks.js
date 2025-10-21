const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { sendReminderEmail } = require('../utils/email');

const router = express.Router();

// Helper function to calculate streak and GP
const calculateStreakAndGP = (user, completionDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastDate = user.lastCompletionDate ? new Date(user.lastCompletionDate) : null;
  lastDate?.setHours(0, 0, 0, 0);

  let gpEarned = 10; // Base GP
  let streakBonus = 0;

  if (!lastDate) {
    // First completion
    user.currentStreak = 1;
  } else if (lastDate.getTime() === today.getTime()) {
    // Already completed today, no additional GP
    return { gpEarned: 0, streakBonus: 0 };
  } else if (lastDate.getTime() === today.getTime() - 86400000) {
    // Consecutive day
    user.currentStreak += 1;
    // Bonus GP for streaks
    if (user.currentStreak % 3 === 0) {
      streakBonus = 20;
    }
  } else {
    // Streak broken
    user.currentStreak = 1;
  }

  user.lastCompletionDate = completionDate;
  if (user.currentStreak > user.longestStreak) {
    user.longestStreak = user.currentStreak;
  }

  return { gpEarned, streakBonus };
};

// Check for achievements
const checkAchievements = (user) => {
  const newAchievements = [];

  if (user.currentLevel >= 1 && !user.achievements.some(a => a.type === 'first_bloom')) {
    newAchievements.push({ type: 'first_bloom' });
  }
  if (user.currentStreak >= 7 && !user.achievements.some(a => a.type === 'seven_day_growth')) {
    newAchievements.push({ type: 'seven_day_growth' });
  }
  if (user.currentLevel >= 4 && !user.achievements.some(a => a.type === 'forest_creator')) {
    newAchievements.push({ type: 'forest_creator' });
  }
  if (user.longestStreak >= 30 && !user.achievements.some(a => a.type === 'streak_master')) {
    newAchievements.push({ type: 'streak_master' });
  }
  if (user.growthPoints >= 1000 && !user.achievements.some(a => a.type === 'productivity_hero')) {
    newAchievements.push({ type: 'productivity_hero' });
  }

  newAchievements.forEach(achievement => {
    user.achievements.push(achievement);
  });

  return newAchievements;
};

// GET all tasks for the user
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new task
router.post('/', protect, async (req, res) => {
  const task = new Task({
    description: req.body.description,
    status: req.body.status || false,
    goalDate: req.body.goalDate,
    user: req.user.id
  });

  try {
    const newTask = await task.save();

    // Send reminder email if goal date is set and is today or tomorrow
    if (newTask.goalDate) {
      const today = new Date();
      const goalDate = new Date(newTask.goalDate);
      const diffTime = goalDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 1 && diffDays >= 0) {
        const user = await User.findById(req.user.id);
        if (user) {
          await sendReminderEmail(user.email, newTask.description, newTask.goalDate);
        }
      }
    }

    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update task (edit or mark complete)
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const wasCompleted = task.status;
    const isBeingCompleted = req.body.status === true;

    if (req.body.description != null) {
      task.description = req.body.description;
    }
    if (req.body.status != null) {
      task.status = req.body.status;
    }
    if (req.body.goalDate != null) {
      task.goalDate = req.body.goalDate;
    }

    const updatedTask = await task.save();

    // Update GP and streak progress if task is being marked as completed
    if (!wasCompleted && isBeingCompleted) {
      const user = await User.findById(req.user.id);
      if (user) {
        const { gpEarned, streakBonus } = calculateStreakAndGP(user, new Date());
        user.growthPoints += gpEarned + streakBonus;

        // Level up every 100 GP
        user.currentLevel = Math.floor(user.growthPoints / 100);

        // Check for achievements
        const newAchievements = checkAchievements(user);

        await user.save();

        // Return updated user data with task
        return res.json({
          task: updatedTask,
          growthUpdate: {
            gpEarned: gpEarned + streakBonus,
            newLevel: user.currentLevel,
            currentStreak: user.currentStreak,
            newAchievements: newAchievements.map(a => a.type)
          }
        });
      }
    }

    // Send reminder email if goal date is updated and is today or tomorrow
    if (updatedTask.goalDate && req.body.goalDate) {
      const today = new Date();
      const goalDate = new Date(updatedTask.goalDate);
      const diffTime = goalDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 1 && diffDays >= 0) {
        const user = await User.findById(req.user.id);
        if (user) {
          await sendReminderEmail(user.email, updatedTask.description, updatedTask.goalDate);
        }
      }
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE task
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
