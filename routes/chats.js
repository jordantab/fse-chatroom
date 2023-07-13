var express = require('express');
var router = express.Router();
var fs = require('fs')
const messageController = require('../controllers/messageController')

const path = require('path')
const messagesPath = path.join(__dirname, '../public/data/messages.json')

router
.route('/')
.get(ensureAuthenticated, async function(req, res) {
  const messages = await messageController.getAllMessages()
  res.render('chatroom', { title: 'Chatroom', user: req.user, messages: messages });
});

function ensureAuthenticated(req, res, next) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    return next()
  } else { 
    // Make the user login if not logged in
    res.redirect('/')
  }
}

module.exports = router;
