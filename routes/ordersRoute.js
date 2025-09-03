const express =  require('express')
const { addOrder, updateOrder, deleteOrder, showOrders } = require('../controllers/orderController')
const router = express.Router()

router.get('/', showOrders)
router.post('/',addOrder)
router.put('/',updateOrder)
router.delete('/',deleteOrder)

module.exports = router