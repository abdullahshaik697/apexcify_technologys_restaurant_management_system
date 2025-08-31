const express =  require('express')
const router = express.Router()

router.get('orders',orderyController)
router.post('orders',orderController)
router.put('orders',orderController)
router.delete('orders',orderController)

module.exports = router