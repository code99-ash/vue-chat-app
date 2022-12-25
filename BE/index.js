const express = require('express');
const mongoose = require('mongoose');
const { User, Chat } = require('./models')
const cors = require('cors')
const http = require('http');
const socketio = require('socket.io')
const emitter = require('./events/emitter')

require('dotenv').config()

const app = express();
const server = http.createServer(app, {
    cors: {
        origin: process.env.CLIENT_URL,
        
    }
})
const io = socketio(server, {
    allowEIO3: true,
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
        credentials: true
    }
})

io.on('connection', socket => {
    // const token = socket.handshake.headers.cookie.split('; ')[1].split('auth._token.local=Bearer%20')[1];

    socket.emit('message', `A user connected: ${socket.id}`)
    console.log('A user connected', socket.id)

    // socket.on('broadcastLogin', () => {
    //     const {_id} = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    //     socket.broadcast.emit('userLoggedIn', _id)
    // })

    socket.on('Hello', msg => {
        console.log(msg)
        socket.emit('message', `Sent::: ${msg}`)
    })
    socket.on('sendMessage', (chat) => {
        console.log(chat)
        io.emit('newMessage', chat)
    })

})

var corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/api', async(req, res) => {
    try {
        const users = await User.find({}, {password: 0});
        res.json(users)
    }catch(err) {
        console.log(err)
        res.send().status(500)
    }
})
app.use('/api/auth', require('./routes/auth'))
app.use('/api/chats', require('./routes/chats'))

app.get('/clear', async(req, res) => {
    try {
        await Chat.deleteMany();
        res.send('Cleared')
    }catch(err) {   
        console.error(err)
    }
})


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))

mongoose.connect(
    process.env.DB_URL, 
    {useNewUrlParser: true,useUnifiedTopology: true},
    // (err) => {
    //     if(err)
    //         console.log('Failed to connect to the server, restarting the server will be recommended', err)
    //     else
    //     console.log('Connected to db')
    // }
);

const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected', process.env.DB_URL)
})

db.once('error', err => {
    console.error('Connection error:', err)
})