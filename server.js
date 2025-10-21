// Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-todo-app';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');
app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);

// Root route
app.get('/', (req, res) => {
  res.send('MERN To-Do List API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
