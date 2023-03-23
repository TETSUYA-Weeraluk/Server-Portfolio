const express = require('express');
const { getAllDataManagement, updateDataManagement, insertDataManagement, selectItemSkill, insertItemSkill } = require('../controller/dataMangement');
const router = express.Router();

router.get('/getalldatamanagement', getAllDataManagement)
router.get('/selectItemSkill', selectItemSkill)
router.post('/updatedatamanagement', updateDataManagement)
router.post('/insertdatamanagement', insertDataManagement)
router.post('/insertItemSkill', insertItemSkill)

module.exports = router;