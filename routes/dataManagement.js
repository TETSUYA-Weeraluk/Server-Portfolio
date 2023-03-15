const express = require('express');
const { getAllDataManagement } = require('../controller/dataMangement');
const router = express.Router();

router.get('/getalldatamanagement', getAllDataManagement)

module.exports = router;