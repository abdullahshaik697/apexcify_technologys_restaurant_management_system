const express =  require('express') 
const { showTables, occupyTable, completeTable, reserveTable } = require('../controllers/tableController')
const router = express.Router()

router.get('/', showTables)
router.post('/reserve/:id', reserveTable )
router.post('/occupy/:id', occupyTable)
router.post('/complete/:id', completeTable)

module.exports = router 