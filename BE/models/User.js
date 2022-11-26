const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
});

// User.watch().on('change', async(data) => {
//     if(data.operationType == 'delete') {
//         console.log('User remved', data)
        
//         await Chat.deleteMany({ parent: data.documentKey._id });
//         await Comment.deleteMany({ Chat: data.documentKey._id })
//         await Reply.deleteMany({ Chat: data.documentKey._id })
//     }

// }) 

module.exports = mongoose.model('User', UserSchema);