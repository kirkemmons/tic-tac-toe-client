'use strict'
//  require the config file so we have our API's url STEP 14
const config = require('../config')

const store = require('../store')

// formData will be our credentials object STEP 15
const signUp = (formData) => {
  // make a request to post/sign-up STEP 16
  return $.ajax({
    url: `${config.apiUrl}/sign-up`,
    method: 'POST',
    data: formData
  })
}
const signIn = (formData) => {
  // make a request to post/sign-in
  return $.ajax({
    url: `${config.apiUrl}/sign-in`,
    method: 'POST',
    data: formData
  })
}
const signOut = (formData) => {
  // make a request to post/sign-out
  return $.ajax({
    url: `${config.apiUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}
const newGame = () => {
  return $.ajax({
    url: `${config.apiUrl}/games`,
    method: 'POST',
    data: {},
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  newGame
}
