const router = require('express').Router();
// const adminAccess = require('../middleware/adminAccess')

const { send, fetch, deleteChat } = require('../controllers/ChatController')

router.get('/' , (...params) => send(...params))
router.post('/send', (...params) => create(...params))
router.post('/delete', (...params) => deleteChat(...params))

module.exports = router;