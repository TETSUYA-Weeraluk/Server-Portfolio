const express = require('express');
const router = express.Router();
const {checkUser , getUser} = require('../controller/user')

router.post('/checkUser', checkUser)
router.get('/getUser', getUser)

module.exports = router;