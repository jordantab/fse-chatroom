var express = require('express');
var router = express.Router();
var fs = require('fs')
const messageController = require('../controllers/messageController')

const path = require('path')
const messagesPath = path.join(__dirname, '../public/data/messages.json')

router
.route('/')
.get(async function(req, res) {
  const messages = await messageController.getAllMessages()
  res.render('chatroom', { title: 'Chatroom', user: req.user, messages: messages });
});

module.exports = router;
