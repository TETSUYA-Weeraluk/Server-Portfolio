const express = require('express');
const router = express.Router();
const {checkUser , getAllUser, getUser , getAllRole , updateUer, deleteUser} = require('../controller/user')

router.post('/checkUser', checkUser)
router.get('/getalluser', getAllUser)
router.get('/getallrole', getAllRole)
router.post('/getuser', getUser)
router.post('/updateuser', updateUer)
router.post('/deleteUser', deleteUser)

module.exports = router;