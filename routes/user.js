const express = require('express');
const router = express.Router();
const {checkUser} = require('../controller/user')

router.post('/checkUser', checkUser)

module.exports = router;