const express =  require('express')
const { showMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController')
const router = express.Router()

router.get('/',showMenuItems)
router.post('/',addMenuItem)
router.patch('/:id',updateMenuItem)
router.delete('/:id',deleteMenuItem)
 
module.exports = router