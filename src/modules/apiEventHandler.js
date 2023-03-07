import { getScores, sendNewScore } from './apiController.js';

// API URL constants
const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const gameId = 'Qk0kT5Wu3yuyKedwVs55';
const API_URL = `${baseURL + gameId}/scores`;

// HTML elements
const refreshButton = document.querySelector('.refresh-button');
const leaderboardTable = document.querySelector('.leaderboard-table');
const form = document.querySelector('.leaderboard-form');

// Refresh Scores function
const refreshScores = () => {
  // Fetch API URL
  getScores(API_URL)
    .then((result) => {
      const resultArray = result.result;
      leaderboardTable.innerHTML = '';
      let scores = '';

      // Create list elements for each result
      resultArray.forEach((score) => {
        scores += `<li>${score.user}: ${score.score}</li>`;
      });

      // Insert list elements to leaderboard
      leaderboardTable.insertAdjacentHTML('afterbegin', scores);
    })
    .catch((error) => error);
};

// Send new data function
const submitNewScore = async () => {
  const name = document.querySelector('.name-input').value;
  const score = document.querySelector('.score-input').value;

  const scoreData = { user: name, score };
  await sendNewScore(API_URL, scoreData);

  document.querySelector('.name-input').value = '';
  document.querySelector('.score-input').value = '';
};

// DOM manipulation
const createElements = () => {
  refreshScores();

  refreshButton.addEventListener('click', () => {
    refreshScores();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitNewScore();
  });
};

export default createElements;