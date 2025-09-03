const express =  require('express')
const { showMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController')
const router = express.Router()

router.get('/',showMenuItems)
router.post('/',addMenuItem)
router.put('/',updateMenuItem)
router.delete('/',deleteMenuItem)
 
module.exports = router