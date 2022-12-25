const { User } = require('../models');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emitter = require('../events/emitter')

module.exports = {

    signup: async(req, res) => {
        try {
    
            const { username, email, avatar, role, password: unhashed } = req.body;
            // Checking if the user is already in ghe database
            const emailExist = await User.findOne({email: email});
            if(emailExist) 
                return res.status(401).json('Email already exists');
                
                const nameExists = await User.findOne({username});
            if(nameExists)
                return res.status(401).json('Username already exists');
    
    
            // Hash the Password
            const salt = bcrypt.genSaltSync(10);
            const password = await bcrypt.hashSync(unhashed, salt);
    
            await User.create({ username, email, password, avatar, role });
    
            res.send('Registration was successful !!');
        }catch(err) {
            console.log(err)
            res.status(500).send('An error occured!!')
        }
    },

    login: async(req, res) => {
        try {
            const user = await User.findOne({
                $or: [{email: req.body.identity}, {username: req.body.identity}] 
            });
            // console.log(req.body)
            if(!user) return res.status(401).send("Credentials do not exists, please try again.");
            
            // Password Check
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass) return res.status(401).send('Credentials do not exists, please try again.');
        
            // Create ans assign a token
            const token = jwt.sign({
                _id: user._id, 
                username: user.username, 
                email: user.email, 
                role: user.role
            }, process.env.JWT_TOKEN_SECRET, { expiresIn: '24h' });
        
            res.header('auth-token', token).send(token);
        }catch(err) {
            console.log(err)
            return res.status(500).send('An error occured')
        }
    },

    user: async(req, res, next) => {
        const authorization = req.header("Authorization");
        const token = authorization.split(' ')[1];
        if(!token) return res.status(401).send('Access Denied');
    
        try {
            const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user= verified;
            
            // console.log(verified)
            emitter.emit('userVerified', verified);

            res.header('Authorization', token).json({user: verified}); // for /user
            // next(); //for verify middleware
        }catch(err) {
            console.log(err)
            res.status(500).send('Invalid token');
        }
    }

}





// const refresh = async(req, res, next) => {
//     const authorization = req.header("Authorization");
//     const token = authorization.split(' ')[1];
//     if(!token) return res.status(401).send('Access Denied');

//     try {
//         const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
//         req.user= verified;
//         // console.log(verified)
//         res.header('Authorization', token).json({user: verified}); // for /user
//         // next(); //for verify middleware
//     }catch(err) {
//         res.status(500).send('Invalid token');
//     }
// }