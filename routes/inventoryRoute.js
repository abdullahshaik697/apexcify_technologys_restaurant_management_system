const express =  require('express')
const { addInventoryItem, updateInventoryItem, deleteInventoryItem, showInventoryItems } = require('../controllers/inventoryController')
const router = express.Router()

router.get('/',showInventoryItems)
router.post('/',addInventoryItem)
router.post('/update/:id',updateInventoryItem)
router.delete('/delete/:id',deleteInventoryItem)

module.exports = router