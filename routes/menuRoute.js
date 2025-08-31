const express =  require('express')
const router = express.Router()

router.get('menu',menuController)
router.post('menu',menuController)
router.put('menu',menuController)
router.delete('menu',menuController)

module.exports = router