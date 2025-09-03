const express =  require('express')
const { showTables, addTable, updateTableStatus } = require('../controllers/tableController')
const router = express.Router()

router.get('/', showTables)
router.post('/', addTable)
router.put('/', updateTableStatus)

module.exports = router