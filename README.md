# General Knowledge Quiz

A general knowledge quiz web application.

## Getting Started

### Prerequisites
- Node.js (v24.14.1 or later)
- npm

### Installation

1. Install dependencies by running:
   ```bash
   npm install
   ```

### Running the Project

To start the development server, run:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Features

- **Landing Page**: Eye-catching welcome screen with "Click to Start" button
- **Category Selection**: Choose from 5 different quiz categories
- **Difficulty Levels**: Select from Easy, Intermediate, or Hard difficulty for each category
- **Comprehensive Questions**: 30 questions per category (10 per difficulty level, 150 total)
- **Interactive Quiz**: Multiple-choice questions with instant scoring
- **Single Page Application**: Smooth transitions between landing, categories, difficulty, quiz, and results
- **Responsive Design**: Works on desktop and mobile devices
- **Score Tracking**: Shows final score and percentage for each category and difficulty
- **Timed Quiz**: 5-minute timer with automatic submission
- **Leaderboard**: Track highest scores with user names, sorted by score and time

## Quiz Categories

1. **Geography & Capitals** 🌍 - Questions about countries, cities, and geographical features
2. **Science & Nature** 🔬 - Questions about scientific concepts and natural phenomena
3. **History & Literature** 📚 - Questions about historical events and famous literary works
4. **Mathematics** 🔢 - Questions about mathematical concepts and calculations
5. **General Facts** 🎯 - Questions about general knowledge and trivia

## Difficulty Levels

- **Easy** 🟢 - Basic questions suitable for beginners
- **Intermediate** 🟡 - Moderate challenge for intermediate learners
- **Hard** 🔴 - Advanced questions for experts

## Leaderboard

The leaderboard tracks the highest scores across all quiz attempts. Features include:

- **Score Tracking**: Records final score out of 10 questions
- **Time Tracking**: Records completion time for tie-breaking
- **User Names**: Prompts for user name on first quiz completion
- **Persistent Storage**: Uses localStorage to maintain scores between sessions
- **Smartest Ranking**: Sorts by highest score first, then fastest time
- **Top 3 Highlighting**: Special styling for gold, silver, and bronze positions

## How to Use

1. Visit `http://localhost:3000` to see the landing page
2. Click "Click to Start" to access the category selection
3. Select your preferred quiz category from the available options
4. Choose your desired difficulty level (Easy, Intermediate, or Hard)
5. Answer 10 multiple-choice questions within 5 minutes
6. Click "Submit Quiz" to see your results or wait for the timer to expire
7. View your detailed results with correct/incorrect answers highlighted
8. Check the leaderboard to see top scores (enter your name when prompted)
9. Choose to "Take Quiz Again", "Try Another Category", or view the "Leaderboard"
