const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./models')
const cors = require('cors')

const app = express();
require('dotenv').config()

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


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))

mongoose.connect(
    process.env.DB_CONNECT, 
    {useNewUrlParser: true,useUnifiedTopology: true},
    (err) => {
        if(err)
            console.log('Failed to connect to the server, restarting the server will be recommended', err)
        else
        console.log('Connected to db')
    }
);
