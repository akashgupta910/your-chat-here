const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    room_id: {
        type: String,
        required: true
    },
    room_pass: {
        type: String,
        required: true
    },
    message: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model('Chat', ChatSchema);

module.exports = Room;