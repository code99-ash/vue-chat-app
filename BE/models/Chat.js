const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: { createdAt: true }})

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat
