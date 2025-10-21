# GrowTrack - Gamified To-Do List App

GrowTrack is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that transforms productivity into an engaging gardening experience. Complete tasks to earn Growth Points (GP) and watch your virtual garden flourish from a seed to a blooming tree!

## 🌱 Core Concept

Turn productivity into plant growth! Each completed task awards Growth Points that help your virtual plant evolve through stages:
- 🌰 Seed (Level 0)
- 🌿 Sprout (Level 1)
- 🌾 Small Plant (Level 2)
- 🌸 Flowering (Level 3)
- 🌳 Tree (Level 4+)

## ✨ Key Features

### 🎮 Gamification System
- **Growth Points (GP)**: Earn 10 GP per completed task
- **Streak Bonuses**: +20 bonus GP for every 3-day completion streak
- **Plant Evolution**: Level up every 100 GP
- **Achievements**: Unlock badges like "First Bloom", "7-Day Growth", "Forest Creator"
- **Visual Feedback**: Plant droops for missed days, blooms on completion

### 📝 Task Management
- Create, edit, and delete tasks
- Set due dates with reminder notifications
- Mark tasks as complete/incomplete
- Task categories (planned for future updates)
- Priority levels (planned for future updates)

### 🧘 User Experience
- **Authentication**: Secure login/registration with JWT tokens
- **Responsive Design**: Works on desktop and mobile devices
- **Notifications**: Real-time alerts for reminders and achievements
- **Garden Visualization**: Interactive garden with plant growth animation
- **Themes**: Soft green garden palette with optional day/night modes

### 📊 Progress Tracking
- Daily/weekly productivity charts (planned)
- Total GP earned display
- Current plant stage visualization
- Task completion percentage (planned)

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **nodemailer** - Email notifications
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with custom animations
- **React Testing Library** - Component testing

### Development Tools
- **Nodemon** - Auto-restart server
- **Concurrently** - Run multiple scripts
- **Create React App** - React boilerplate

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/growtrack.git
   cd growtrack
2. Install backend dependencies:
npm install
3. Create a .env file in the root directory:
   MONGO_URI=mongodb://127.0.0.1:27017/mern-todo-app
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
4. Start MongoDB service (if running locally)

Frontend Setup:
1. Navigate to client directory:
cd client
2. Install frontend dependencies:
npm install
3. Return to root directory:
cd ..
Running the Application
1. Start both backend and frontend:
npm run dev
This runs the backend on port 5000 and frontend on port 3000.
2. Open http://localhost:3000 in your browser.

📖 Usage
Register/Login: Create an account or log in to access your garden
Add Tasks: Use the task form to create new to-do items with optional due dates
Complete Tasks: Check off tasks to earn GP and watch your plant grow
Monitor Progress: View your garden, current level, streak, and achievements
Stay Productive: Receive reminders for upcoming due dates

🗂 Project Structure
growtrack/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Garden.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── middleware/             # Express middleware
├── models/                 # Mongoose models
│   ├── User.js
│   └── Task.js
├── routes/                 # API routes
│   ├── auth.js
│   └── tasks.js
├── utils/                  # Utility functions
├── server.js               # Express server entry point
├── package.json
└── README.md


🔧 API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/profile - Get user profile (GP, level, streak, achievements)
Tasks
GET /api/tasks - Get all user tasks
POST /api/tasks - Create new task
PUT /api/tasks/:id - Update task (includes GP awarding logic)
DELETE /api/tasks/:id - Delete task
🧪 Testing
Run frontend tests:


cd client
npm test
🚀 Deployment
Backend Deployment
Set environment variables on your hosting platform
Use a MongoDB cloud service like MongoDB Atlas
Deploy to Heroku, Railway, or similar platform
Frontend Deployment
Build the production version:

cd client
npm run build
Deploy the build folder to Netlify, Vercel, or your web server
🤝 Contributing
Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit changes: git commit -m 'Add amazing feature'
Push to branch: git push origin feature/amazing-feature
Open a Pull Request
📝 Future Enhancements
[ ] Task categories and priority levels
[ ] Progress dashboard with charts
[ ] Day/night themes
[ ] Focus mode with nature sounds
[ ] Social features (friend gardens, competitions)
[ ] Mobile app version
[ ] Advanced analytics and insights
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Inspired by habit-tracking apps and gamification principles
Plant growth animations powered by CSS
Icons from various free icon libraries
Happy Gardening! 🌱 Turn your tasks into a thriving garden today.
