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

const onNewGame = () => {
  api
    .newGame()

    .then(ui.newGameSuccess)

    .catch(ui.newGameFailure);
};

let playerO
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


function startGame() {
  playerO = false
  boxElements.forEach(box => {
    box.onClick()
  })
};

const onClick = (event) => {
  console.log('clicked')
  const box = event.target
  // if player is 'O', return oClass otherwise return xClass
  const currentClass = playerO ? oClass : xClass
  placeValue(box, currentClass)
  if (checkForWinner(currentClass)) {
    console.log('winner')
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
  switchTurn()
  }
};

// function isBoxEmpty (box) {
//   console.log(box)
//   if (box.innerHTML === '') {
//     return true
//   } else {
//     return false
//   }
// };

function placeValue(box, currentClass) {
  box.classList.add(currentClass)
};

function switchTurn() {
  playerO = !playerO
};

function isDraw() {
  return [...boxElements].every(box => {
    return box.classList.contains(oClass) || box.classList.contains(xClass)
  })
}

function checkForWinner(currentClass) {
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
}

function endGame(draw) {
  if (draw) {
    winningMessage.innerHTML = "It's a draw!"
  } else {
    winningMessage.innerHTML = `${playerO ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
};

const addMoveToArray = (player, index) => {
  store.game.cells[index] = player
};

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onNewGame,
  onClick,
  placeValue,
  addMoveToArray,
  switchTurn,
  startGame,
  checkForWinner,
  endGame,
  isDraw
};
