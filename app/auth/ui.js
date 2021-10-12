'use strict'

const store = require('../store')

const signUpSuccess = function (responseData) {
  // tell the user it was successful STEP 17
  $('#game-display').text('Signed up successfully!')

  $('#game-display').removeClass()
  $('#game-display').addClass('text-success')

  $('form').trigger('reset')
}
const signInSuccess = function (responseData) {
  // step 19
  store.user = responseData.user

  // tell the user it was successful
  $('#game-display').text('Signed in successfully!')

  $('#game-display').removeClass()
  $('#game-display').addClass('text-success')

  $('form').trigger('reset')

  $('#before-sign-in').hide()
  // after we sign in, show the section with the id 'after-sign-in' STEP 18
  $('#after-sign-in').show()
}
const signOutSuccess = function (responseData) {
  // tell the user it was successful
  $('#game-display').text('Successfully signed out!')

  $('#game-display').removeClass()
  $('#game-display').addClass('text-success')

  $('form').trigger('reset')

  $('#after-sign-in').hide()

  $('#before-sign-in').show()
}

const newGameSuccess = function (responseData) {
  store.currentGame = responseData.currentGame
  console.log(responseData)
  // tell the user it was successful
  $('#game-display').text('Signed in successfully!')

  $('#game-display').removeClass()
  $('#game-display').addClass('text-success')

  $('form').trigger('reset')
  $('#game-section').show()
}

const signUpFailure = function (error) {
  $('#error-message').text('Sign up failed')

  $('#error-message').removeClass()
  $('#error-message').addClass('text-danger')

  console.log('error is', error)
}
const signInFailure = function (error) {
  $('#error-message').text('Sign in failed')

  $('#error-message').removeClass()
  $('#error-message').addClass('text-danger')

  console.log('error is', error)
}
const signOutFailure = function (error) {
  $('#error-message').text('Sign out failed')

  $('#error-message').removeClass()
  $('#error-message').addClass('text-danger')

  console.log('error is', error)
}
const newGameFailure = function (error) {
  $('#error-message').text('Sign in failed')

  $('#error-message').removeClass()
  $('#error-message').addClass('text-danger')

  console.log('error is', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  newGameSuccess,
  newGameFailure
}
