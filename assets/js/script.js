"use strict";

const number = document.querySelector(".number");
const guess = document.querySelector(".field");
const check = document.querySelector(".check");
const guide = document.querySelector(".guide");
const scoreLabel = document.querySelector(".score");
const highscoreLabel = document.querySelector(".highscore");
const retry = document.querySelector(".retry");
const winSFX = new Audio("./assets/audio/win.wav");
const loseSFX = new Audio("./assets/audio/lose.wav");
const incorrectSFX = new Audio("./assets/audio/incorrect.wav");
const highscoreSFX = new Audio("./assets/audio/highscore.wav");

let score;
let highscore = 0;
let randomNumber;
let gameRunning;

const setGuide = (text) => {
  guide.textContent = text;
};

const init = () => {
  document.body.style.backgroundColor = "#FFF";
  number.style.width = "10rem";
  gameRunning = true;
  score = 20;
  randomNumber = Math.trunc(Math.random() * 20 + 1);
  number.textContent = "?";
  guess.value = null;
  setGuide("Start Guessing");
  scoreLabel.textContent = score;
  console.log(randomNumber);
};

const updateScore = () => {
  score--;
  scoreLabel.textContent = score;
};

const updateHighscore = () => {
  highscore = score;
  highscoreLabel.textContent = score;
  animateHighscore();
};

const revealRandomNumber = () => {
  number.textContent = randomNumber;
};

const shakeElement = (element) => {
  element.classList.toggle("shake");
  setTimeout(() => {
    element.classList.toggle("shake");
  }, 500);
};

const animateHighscore = () => {
  document.body.style.backgroundColor = "#FFD54F";
  document.querySelector("header").classList.toggle("to-top");
  document.querySelector(".bottom").classList.toggle("to-bottom");
  document.querySelector(".top").classList.toggle("to-top");
  document.querySelector(".mid").classList.toggle("to-top");
  document.querySelector(".new-highscore").style.display = "block";
  setTimeout(() => {
    document.querySelector(".new-highscore").style.display = "none";
    document.querySelector("header").classList.toggle("to-top");
    document.querySelector(".bottom").classList.toggle("to-bottom");
    document.querySelector(".top").classList.toggle("to-top");
    document.querySelector(".mid").classList.toggle("to-top");
  }, 3000);
};

const evaluateGame = (myNumber) => {
  if (myNumber > randomNumber) {
    setGuide("Too High!");
    shakeElement(number);
    updateScore();
    score !== 0 ? incorrectSFX.play() : null;
  } else if (myNumber < randomNumber) {
    setGuide("Too Low!");
    shakeElement(number);
    updateScore();
    score !== 0 ? incorrectSFX.play() : null;
  } else if (myNumber === randomNumber) {
    revealRandomNumber();
    setGuide("Correct!");
    gameRunning = false;
    if (highscore < score) {
      highscoreSFX.play();
      updateHighscore();
    } else {
      winSFX.play();
      document.body.style.backgroundColor = "#5ECA5E ";
      number.style.width = "100%";
    }
    retry.classList.toggle("to-right");
  }

  if (score === 0) {
    gameRunning = false;
    setGuide("Game Over!");
    document.body.style.backgroundColor = "#F06A6A ";
    scoreLabel.style.color = "#000";
    document.querySelector(".score-heading").style.color = "#000";
    loseSFX.play();
    retry.classList.toggle("to-right");
  } else if (score === 3) {
    scoreLabel.style.color = "#F06A6A";
    document.querySelector(".score-heading").style.color = "#F06A6A";
  }
};

check.addEventListener("click", () => {
  const myGuess = Number(guess.value);
  if (myGuess >= 1 && myGuess <= 20) {
    gameRunning ? evaluateGame(myGuess) : null;
  } else {
    setGuide("[ 1 - 20 ]");
  }
});

retry.addEventListener("click", () => {
  retry.classList.toggle("to-right");
  !gameRunning ? init() : null;
});

init();
