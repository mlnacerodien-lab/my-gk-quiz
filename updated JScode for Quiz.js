const landingContainer = document.getElementById('landing-container');
const mainMenuContainer = document.getElementById('main-menu-container');
const homeContainer = document.getElementById('home-container');
const difficultyContainer = document.getElementById('difficulty-container');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const leaderboardContainer = document.getElementById('leaderboard-container');
const instructionsContainer = document.getElementById('instructions-container');
const playerNameContainer = document.getElementById('player-name-container');

let selectedCategory = null;
let selectedDifficulty = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 0;
let timerInterval = null;
let quizCompleted = false;

const quizCategories = {
  geography: {
    name: 'Geography',
    description: 'Explore maps, landscapes, capitals, and natural wonders from around the world.'
  },
  science: {
    name: 'Science',
    description: 'Test your understanding of biology, physics, chemistry and scientific discoveries.'
  },
  mathematics: {
    name: 'Mathematics',
    description: 'Solve problems and choose the right answers from arithmetic to advanced math topics.'
  },
  general: {
    name: 'General Knowledge',
    description: 'A mixed category for trivia, culture, facts, and fun general questions.'
  },
  history: {
    name: 'History',
    description: 'Answer questions about famous events, leaders, and civilization milestones.'
  }
};

const quizData = {
  geography: {
    easy: [
      {
        question: 'What is the largest continent?',
        options: ['Asia', 'Africa', 'Europe', 'Antarctica'],
        correct: 'Asia'
      }
    ],
    intermediate: [
      {
        question: 'Which river is the longest in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correct: 'Nile'
      }
    ],
    hard: [
      {
        question: 'What is the deepest point on Earth?',
        options: ['Mariana Trench', 'Tonga Trench', 'Puerto Rico Trench', 'Kuril–Kamchatka Trench'],
        correct: 'Mariana Trench'
      }
    ]
  },
  science: {
    easy: [
      {
        question: 'What planet is known as the Red Planet?',
        options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
        correct: 'Mars'
      }
    ],
    intermediate: [
      {
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'O2', 'CO2', 'NaCl'],
        correct: 'H2O'
      }
    ],
    hard: [
      {
        question: 'What particle has a negative charge?',
        options: ['Electron', 'Proton', 'Neutron', 'Photon'],
        correct: 'Electron'
      }
    ]
  },
  mathematics: {
    easy: [
      {
        question: 'What is 2 + 2?',
        options: ['4', '3', '5', '6'],
        correct: '4'
      }
    ],
    intermediate: [
      {
        question: 'What is the square root of 81?',
        options: ['9', '8', '6', '7'],
        correct: '9'
      }
    ],
    hard: [
      {
        question: 'What is the value of pi rounded to two decimal places?',
        options: ['3.14', '2.72', '1.62', '4.13'],
        correct: '3.14'
      }
    ]
  },
  general: {
    easy: [
      {
        question: 'What color is the sky on a clear day?',
        options: ['Blue', 'Green', 'Orange', 'Red'],
        correct: 'Blue'
      }
    ],
    intermediate: [
      {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Rome', 'Berlin'],
        correct: 'Paris'
      }
    ],
    hard: [
      {
        question: 'What is the main gas in Earth’s atmosphere?',
        options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Hydrogen'],
        correct: 'Nitrogen'
      }
    ]
  },
  history: {
    easy: [
      {
        question: 'Who was the first President of the United States?',
        options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
        correct: 'George Washington'
      }
    ],
    intermediate: [
      {
        question: 'In which year did World War II end?',
        options: ['1945', '1939', '1918', '1963'],
        correct: '1945'
      }
    ],
    hard: [
      {
        question: 'Which empire built the road network known as the Appian Way?',
        options: ['Roman Empire', 'Ottoman Empire', 'Mongol Empire', 'Persian Empire'],
        correct: 'Roman Empire'
      }
    ]
  }
};

function hideAllContainers() {
  [landingContainer, mainMenuContainer, homeContainer, difficultyContainer, playerNameContainer, quizContainer, resultsContainer, leaderboardContainer, instructionsContainer].forEach(container => {
    if (container) container.classList.add('hidden');
  });
}

function showHome() {
  hideAllContainers();
  landingContainer.classList.remove('hidden');
  animatePage(landingContainer);
}

function showMainMenu() {
  hideAllContainers();
  mainMenuContainer.classList.remove('hidden');
  animatePage(mainMenuContainer);
  updatePlayerDisplay();
}

function showCategories() {
  hideAllContainers();
  homeContainer.classList.remove('hidden');
  renderCategoryGrid();
  animatePage(homeContainer);
}

function renderCategoryGrid() {
  const leftGrid = document.getElementById('category-grid-left');
  const rightGrid = document.getElementById('category-grid-right');
  leftGrid.innerHTML = '';
  rightGrid.innerHTML = '';

  const leftCategories = ['mathematics', 'general'];
  const rightCategories = ['geography', 'science', 'history'];

  leftCategories.forEach(key => leftGrid.appendChild(createCategoryCard(key)));
  rightCategories.forEach(key => rightGrid.appendChild(createCategoryCard(key)));
}

function createCategoryCard(key) {
  const category = quizCategories[key];
  const card = document.createElement('div');
  card.className = 'category-card fade-in';
  card.innerHTML = `
    <div class="category-details">
      <h3>${category.name}</h3>
      <p>${category.description}</p>
    </div>
    <button type="button" class="home-btn" onclick="selectCategory('${key}')">Select</button>
  `;
  return card;
}

function showInstructions() {
  hideAllContainers();
  instructionsContainer.classList.remove('hidden');
  animatePage(instructionsContainer);
}

function showLeaderboard() {
  hideAllContainers();
  leaderboardContainer.classList.remove('hidden');
  animatePage(leaderboardContainer);
  displayLeaderboard();
}

function selectCategory(category) {
  selectedCategory = category;
  showDifficulty();
}

function selectDifficulty(difficulty) {
  selectedDifficulty = difficulty;
  showPlayerNamePage();
}

function showDifficulty() {
  hideAllContainers();
  difficultyContainer.classList.remove('hidden');
  animatePage(difficultyContainer);
}

function showPlayerNamePage() {
  hideAllContainers();
  playerNameContainer.classList.remove('hidden');
  animatePage(playerNameContainer);
  const nameInput = document.getElementById('player-name-input');
  if (nameInput) {
    nameInput.value = localStorage.getItem('playerName') || '';
    nameInput.focus();
  }
}

function submitPlayerName() {
  const nameInput = document.getElementById('player-name-input');
  const enteredName = nameInput ? nameInput.value.trim() : '';
  const playerName = enteredName || 'Anonymous';
  localStorage.setItem('playerName', playerName);
  updatePlayerDisplay();
  startQuiz();
}

function getQuestionsForCategory(category, difficulty) {
  return (quizData[category] && quizData[category][difficulty]) ? [...quizData[category][difficulty]] : [];
}

function getTimeLimitByDifficulty(difficulty) {
  if (difficulty === 'easy') return 240;
  if (difficulty === 'intermediate') return 180;
  if (difficulty === 'hard') return 120;
  return 240;
}

function startQuiz() {
  if (!selectedCategory || !selectedDifficulty) {
    alert('Please choose a category and difficulty first.');
    showCategories();
    return;
  }

  stopTimer();
  quizCompleted = false;
  currentQuestions = getQuestionsForCategory(selectedCategory, selectedDifficulty);

  if (currentQuestions.length === 0) {
    alert('No questions available for this category and difficulty. Please choose another option.');
    showCategories();
    return;
  }

  currentQuestionIndex = 0;
  score = 0;

  hideAllContainers();
  quizContainer.classList.remove('hidden');
  animatePage(quizContainer);
  updatePlayerDisplay();
  startTimer();
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    completeQuiz();
    return;
  }

  const question = currentQuestions[currentQuestionIndex];
  document.getElementById('question-counter').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
  document.getElementById('question-text').textContent = question.question;

  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  question.options.forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-btn';
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedAnswer) {
  const question = currentQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.correct;
  const options = document.querySelectorAll('.option-btn');

  options.forEach(button => {
    button.disabled = true;
    if (button.textContent === question.correct) {
      button.classList.add('correct');
    } else if (button.textContent === selectedAnswer) {
      button.classList.add('incorrect');
    }
  });

  if (isCorrect) score++;

  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
  }, 900);
}

function completeQuiz() {
  if (quizCompleted) return;
  quizCompleted = true;
  stopTimer();

  const totalQuestions = currentQuestions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const timeTaken = getTimeLimitByDifficulty(selectedDifficulty) - timeLeft;

  document.getElementById('final-score').textContent = `${score} / ${totalQuestions}`;
  document.getElementById('final-percentage').textContent = `${percentage}%`;
  document.getElementById('time-taken').textContent = `Time used: ${formatTime(timeTaken)}`;
  document.getElementById('result-message').textContent = percentage >= 60 ? 'Great job! You passed the quiz.' : 'You can improve. Try again!';

  saveQuizResultToLeaderboard();
  showDetailedResults();
  hideAllContainers();
  resultsContainer.classList.remove('hidden');
  animatePage(resultsContainer);
}

function saveQuizResultToLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  const playerName = localStorage.getItem('playerName') || 'Anonymous';
  const totalQuestions = currentQuestions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const entry = {
    name: playerName,
    category: quizCategories[selectedCategory] ? quizCategories[selectedCategory].name : selectedCategory,
    difficulty: selectedDifficulty,
    score,
    total: totalQuestions,
    percentage,
    timeTaken: formatTime(getTimeLimitByDifficulty(selectedDifficulty) - timeLeft),
    date: new Date().toLocaleString()
  };
  leaderboard.push(entry);
  leaderboard.sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.date) - new Date(a.date);
  });
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 50)));
}

function showDetailedResults() {
  const detailedResults = document.getElementById('detailed-results');
  detailedResults.innerHTML = '';

  currentQuestions.forEach((question, index) => {
    const item = document.createElement('div');
    item.className = 'review-summary';
    item.innerHTML = `
      <strong>${index + 1}. ${question.question}</strong><br>
      Correct answer: ${question.correct}
    `;
    detailedResults.appendChild(item);
  });
}

function startTimer() {
  stopTimer();
  timeLeft = getTimeLimitByDifficulty(selectedDifficulty);
  document.getElementById('timer').textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft -= 1;
    document.getElementById('timer').textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      stopTimer();
      completeQuiz();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updatePlayerDisplay() {
  const playerName = localStorage.getItem('playerName') || 'Anonymous';
  const quizPlayerDisplay = document.getElementById('quiz-player-display');
  if (quizPlayerDisplay) quizPlayerDisplay.textContent = `Player: ${playerName}`;
}

function displayLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = '';

  if (leaderboard.length === 0) {
    leaderboardList.innerHTML = '<p>No scores yet. Complete a quiz to create a score.</p>';
    return;
  }

  leaderboard.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'leaderboard-item';
    div.innerHTML = `
      <div class="leaderboard-top">
        <strong>#${index + 1} ${entry.name}</strong>
        <span>${entry.percentage}%</span>
      </div>
      <div>${entry.score}/${entry.total} correct</div>
      <div>${entry.category} • ${entry.difficulty}</div>
      <div>Time: ${entry.timeTaken}</div>
      <small>${entry.date}</small>
    `;
    leaderboardList.appendChild(div);
  });
}

function animatePage(element) {
  if (!element) return;
  element.classList.remove('fade-in');
  void element.offsetWidth;
  element.classList.add('fade-in');
}

function goHome() {
  stopTimer();
  selectedCategory = null;
  selectedDifficulty = null;
  showHome();
}

window.addEventListener('DOMContentLoaded', showHome);
