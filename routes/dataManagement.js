const express = require('express');
const { getAllDataManagement, updateDataManagement } = require('../controller/dataMangement');
const router = express.Router();

router.get('/getalldatamanagement', getAllDataManagement)
router.post('/updatedatamanagement', updateDataManagement)

module.exports = router;