# TODO: Implement GrowTrack - The Gamified To-Do List App

## Core Concept
GrowTrack turns productivity into plant growth. Complete tasks to earn Growth Points (GP) that help your virtual plant evolve through stages: Seed 🌰 → Sprout 🌿 → Small Plant 🌾 → Flowering 🌸 → Tree 🌳

## Key Features to Implement

### 🌱 Growth Mechanics
- [x] Basic garden level system (0-7)
- [ ] Implement Growth Points (GP) system: +10 GP per completed task
- [ ] Plant levels up every 100 GP
- [ ] Visual plant droop for missed days
- [ ] Streak system: +20 bonus GP per 3-day streak
- [ ] Track last completion date for streak calculation

### 🎮 Gamification
- [ ] Daily streak counter
- [ ] Achievements system (First Bloom, 7-Day Growth, Forest Creator)
- [ ] Motivational messages on task completion
- [ ] XP-based plant evolution

### 📊 Progress Dashboard
- [ ] Daily/weekly productivity charts
- [ ] Total GP earned display
- [ ] Current plant stage visualization
- [ ] Task completion percentage

### 🧘 Mood & Theme
- [ ] Soft green palette (update CSS)
- [ ] Ambient garden background
- [ ] Optional Focus Mode with lo-fi nature sounds
- [ ] Day/Night themes synced to system clock

### 📝 Enhanced To-Do Functionality
- [x] Basic add/edit/delete tasks
- [ ] Task categories (Study, Work, Health, etc.)
- [x] Due dates and reminders (already implemented)
- [ ] Task priority levels

### ☁️ Data Persistence
- [x] MongoDB integration for garden progress
- [ ] Enhanced user model with GP, streaks, achievements
- [ ] Backup and sync capabilities

## Current Status
- Basic garden with plant selection implemented
- Need to transition to GP-based system
- Add streak tracking and achievements
- Enhance UI with dashboard and themes

## Next Steps
- [ ] Update User model to include GP, streaks, achievements
- [ ] Modify task completion logic to award GP instead of simple level increment
- [ ] Implement streak calculation and bonus GP
- [ ] Create achievement system
- [ ] Update Garden component with GP display and new stages
- [ ] Add progress dashboard component
- [ ] Implement day/night themes
- [ ] Add focus mode with sounds
