const express =  require('express')
const router = express.Router()

router.get('tables',tableController)
router.post('tables',tableController)
router.put('tables',tableController)

module.exports = router