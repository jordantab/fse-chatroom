// Import Message model
const Message = require('../models/message')

class messageController {
    static async getAllMessages() {
        try {
            // Get all existing messages from the db
            const messages = await Message.getAll()
            return messages

        } catch (err) {
            res.status(500).json({ error: 'An error occured while retrieving all of the messages'})
        }
    }
    static async saveMessage(msg) {
        try {
            // Create new message instance
            let newMessage = new Message({
                username: msg.username,
                text: msg.text,
                timestamp: msg.timestamp,
            })
            // Save new message to db
            const savedMessage = await newMessage.saveMessage()
            console.log(`${msg.username} posted a new message at ${msg.timestamp}`)

            return savedMessage
        } catch (err) {
            res.status(500).json({ error: 'An error occured while sending message' })
        }
    }
}

module.exports = messageController