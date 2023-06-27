var express = require('express');
var router = express.Router();
var User = require('../models/user');
var userController = require('../controllers/userController')


router
  .route('/')
  .get(function(req, res, next) {
      res.render('index');
  })


router
  .route('/login')
  .post(validateUserInput, userController.login)

router
  .route('/register')
  .get(function(req,res) {
    res.render('register')
  })
  .post(validateUserInput, userController.register)

router
.route('/chatroom')
.get(function(req, res) {
  // Check that the user is authenticated...
  // If authenticated:
  res.render('chatroom')
});

function validateUserInput(req, res, next) {
  let username = req.body.Username
  let password = req.body.Password

  if (!username || !password) {
      return res.status(400).json({ error: "Both username and password are required" })
  }
  next()
}

module.exports = router
