const express =  require('express')
const router = express.Router()

router.get('inventory',inventoryController)
router.post('inventory',inventoryController)
router.put('inventory',inventoryController)
router.delete('inventory',inventoryController)

module.exports = router