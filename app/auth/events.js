/* eslint-disable semi */
'use strict'

// require the getFormFields function to get data from our forms STEP 7
const getFormFields = require('../../lib/get-form-fields');
const store = require('../store');

// require our api auth function STEP 5
const api = require('./api')
// require our ui functions to update the page STEP 6
const ui = require('./ui')

const onSignUp = (event) => {
  // prevent the default action of browser refreshing STEP 8
  event.preventDefault()

  // event.target is the form that casued the 'submit' event STEP 9
  const form = event.target
  // get the data from our form element STEP 10
  const formData = getFormFields(form)

  // make up POST / sign-up request, pass it the email/password/pw confirmation STEP 11
  api
    .signUp(formData)
    // if our sign-up request is successful, run the signUpSuccess function STEP 12
    .then(ui.signUpSuccess)
    // otherwise run a signUpFailure function STEP 13
    .catch(ui.signUpFailure)
};

const onSignIn = (event) => {
  event.preventDefault()

  const form = event.target

  const formData = getFormFields(form)
  console.log(formData)

  api
    .signIn(formData)

    .then(ui.signInSuccess)

    .catch(ui.signInFailure)
};

const onSignOut = (event) => {
  event.preventDefault()

  const form = event.target

  const formData = getFormFields(form)

  api
    .signOut(formData)

    .then(ui.signOutSuccess)

    .catch(ui.signOutFailure)
};

const onNewGame = (box) => {
  api
    .newGame()

    .then(ui.newGameSuccess)

    .catch(ui.newGameFailure)
};

let playerO
let isGameOver = false
const xClass = 'X'
const oClass = 'O'
const boxElements = document.querySelectorAll('[data-box]')
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const winningMessage = document.querySelector('[data-winning-message]')
const winningMessageElement = document.getElementById('winningMessage')

startGame()

function startGame () {
  playerO = false
  boxElements.forEach(box => {
  })
};

const restartGame = (event) => {
  $('.box').text('')
  $('.box').removeClass('X')
  $('.box').removeClass('O')
  isGameOver = false
  winningMessage.innerHTML = ('Play Again!')
  playerO = false
}

const onClick = (event) => {
  console.log('clicked');
  const box = event.target;
  console.log(box);
  // if player is 'O', return oClass otherwise return xClass
  const currentClass = playerO ? oClass : xClass;
  console.log(currentClass)
  if (hasValue(box)) {
    console.log('Box has a value. Choose another square!');
    return;
  }
  if (isGameOver) {
    console.log('Game is over. Play New Game!');
    return;
  }
  console.log('Box does not have a value.');
  placeValue(box, currentClass);
  if (checkForWinner(currentClass)) {
    console.log('Winner!');
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurn();
  }
};

function hasValue (box) {
  if (box.innerHTML === '') {
    return false
  } else {
    return true
  }
};

function placeValue (box, currentClass) {
  box.innerHTML = currentClass
  box.classList.add(currentClass)
};

function switchTurn () {
  playerO = !playerO
};

function isDraw () {
  // destructured boxElements into an array to be used by the every method
  return [...boxElements].every(box => {
    return box.classList.contains(oClass) || box.classList.contains(xClass)
  })
};

function checkForWinner (currentClass) {
  // return true if any of the values within the array are true
  // loop over all of the possible combinations in the array
  return winningCombinations.some(combination => {
    // check if all the values in the box elements have the same class
    return combination.every(index => {
      // check the class list at each index and check if it contains the current class
      // if every single box inside of the combinations is correct in at least one of the winning combinations then there is a winner
      return boxElements[index].classList.contains(currentClass)
    })
  })
};

function endGame (draw) {
  if (draw) {
    winningMessage.innerHTML = "It's a draw! Hit the restart button and play again!"
  } else {
    winningMessage.innerHTML = `${playerO ? "O's" : "X's"} Win!`
  }
  isGameOver = true
  winningMessageElement.classList.add('show')
};

const addMoveToArray = (currentClass, index) => {
  store.game.cells[index] = currentClass
};

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onNewGame,
  onClick,
  hasValue,
  placeValue,
  addMoveToArray,
  switchTurn,
  startGame,
  checkForWinner,
  endGame,
  isDraw,
  restartGame
};
