"use strict";
const cell = document.querySelector("cell");
const playground = document.querySelector(".playground");
const cellsAll = document.querySelectorAll(".cell");
const dataCellsAll = document.querySelectorAll("[data-cell]");
const winnerPopUp = document.querySelector(".winner");
const playgroundBlock = document.querySelector(".playground--block");
const restartBtn = document.querySelectorAll("[data-restart]");
const statX = document.querySelector(".stat-x");
const statCircle = document.querySelector(".stat-circle");
const statBtn = document.querySelectorAll(".button-statisticts");
const btnX = document.querySelector(".button--x");
const btnCircle = document.querySelector(".button--circle");

const circle = "circle";
const x = "x";
let playerO; // false or true
let moves = 0;
let score = {
  PlayerX: 0,
  PlayerCircle: 0,
};

const combinations = [
  [0, 1, 2],
  [6, 7, 8],
  [3, 4, 5],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/////////////////////////////////////
/////////////////////////////////////

const game = function (e) {
  const cell = e.target;
  moves++;

  // check current palyer
  const currentPlayer = playerO ? circle : x;
  // Add a mark
  cell.classList.add(currentPlayer);

  //
  // Check if win
  if (checkWin(currentPlayer)) {
    //  ADD a score
    addScore(currentPlayer);
    // Show a messege
    winnerMessege(currentPlayer);
    // Ask to play again
  } else if (moves >= 9) {
    draw();
  } else changePlayer();
  // Active turn btn
};

// BTNS
restartBtn.forEach((btn) => btn.addEventListener("click", restart));

dataCellsAll.forEach(
  (cell) => cell.addEventListener("click", game, { once: true }) // 'once' doesnt work with a playground
);

///////////////////////////////////////////////////
///////////////////////////////////////////////////
////// Functions

function changePlayer() {
  playerO = !playerO;
  statBtn.forEach((btn) => {
    btn.classList.remove("active--player");
  });
  if (playerO) {
    btnCircle.classList.add("active--player");
  } else btnX.classList.add("active--player");
}

// Check if the current playes WON.

function checkWin(currentPlayer) {
  return combinations.some((combination) => {
    return combination.every((num) => {
      return dataCellsAll[num].classList.contains(currentPlayer);
    });
  });
}

// IF WON add a score and change the textContent parameter

function addScore(currentPlayer) {
  currentPlayer === x ? score.PlayerX++ : score.PlayerCircle++;
  statX.textContent = score.PlayerX;
  statCircle.textContent = score.PlayerCircle;
}

function winnerMessege(currentPlayer) {
  winnerPopUp.classList.add(currentPlayer);
  winnerPopUp.classList.remove("hidden");
}

// If DRAW
function draw() {
  winnerPopUp.textContent = "DRAW!";
  // winnerPopUp.classList.add("circle").style.transform = "translateY(-4rem)";
  // winnerPopUp.classList.add("x").style.transform = "translateY(4rem)";
  winnerPopUp.classList.remove("hidden");
}

// Restart. Clear parameters, remove, add classes
function restart() {
  dataCellsAll.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", game);
    cell.addEventListener("click", game, { once: true });
  });
  winnerPopUp.textContent = "WINNER!";
  winnerPopUp.classList.add("hidden");
  winnerPopUp.classList.remove("x");
  winnerPopUp.classList.remove("circle");
  playerO = false;
  moves = 0;
}
