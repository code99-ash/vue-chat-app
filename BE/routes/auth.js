const router = require('express').Router();
const {signup, login, user} = require('../controllers/AuthController')


router.post('/signup', (...prams) => signup(...prams));
router.post('/login', (...params) => login(...params));
router.get('/user', (...params) => user(...params));

module.exports = router;