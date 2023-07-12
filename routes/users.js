var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const passport = require('passport')

router
  .route('/')
  .get(function(req, res) {
      res.render('index');
  })


router
  .route('/login')
  .post(validateUserInput,
    passport.authenticate('local', {
    successRedirect: '/chatroom',
    failureRedirect: '/',
    failureFlash: true
}))

router
  .route('/register')
  .get(function(req, res) {
    res.render('register')
  })
  .post(validateUserInput, userController.register)

router
.route('/logout')
.post(userController.logout)

function validateUserInput(req, res, next) {
  let username = req.body.Username
  let password = req.body.Password

  if (!username || !password) {
      return res.status(400).json({ error: "Both username and password are required" })
  }
  next()
}

module.exports = router
