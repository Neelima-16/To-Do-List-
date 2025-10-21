const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: false // false = incomplete, true = completed
  },
  goalDate: {
    type: Date,
    required: false // optional goal date to complete the task
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Task', taskSchema);
