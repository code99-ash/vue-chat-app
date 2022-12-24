const router = require('express').Router();
// const adminAccess = require('../middleware/adminAccess')

const { send, fetch, deleteChat } = require('../controllers/ChatController')

router.post('/' , (...params) => fetch(...params))
router.post('/send', (...params) => send(...params))
router.post('/delete', (...params) => deleteChat(...params))

module.exports = router;