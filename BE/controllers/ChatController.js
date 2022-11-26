const { User, Chat } = require('../models');

module.exports = {
    send: async(req, res) => {
        try {
            // const { message, sender, recipient } = req.body;
            await Chat.create(req.body);
            res.send('Post was created successfully !!');
        }catch(err) {
            console.log(err)
            res.status(500).send('Failed to Send')
        }
    },
    
    fetch: async(req, res, next) => {
        try {
            const {sender, recipient} = req.body
            const chats = await Chat.find({sender, recipient});
            res.json(chats);
        }catch(err) {
            console.log(err)
            res.status(500).send('An error occured')
        }
    },

    deleteChat: async(req, res, next) => {
        try {
            const {sender, recipient} = req.body
            const chats = await Chat.deleteMany({sender, recipient});
            res.json('Successfully delete');
        }catch(err) {
            console.log(err)
            res.status(500).send('Failed to delete chat')
        }
    },
}