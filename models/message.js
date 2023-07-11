const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
})

// Method to retrieve all existing messages from the db
MessageSchema.statics.getAll = async function () {
  return this.find({})
}

// Method to save a new message to the db
MessageSchema.methods.saveMessage = async function () {
  return this.save()
}

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
