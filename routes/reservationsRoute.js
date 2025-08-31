const express =  require('express')
const router = express.Router()

router.get('reservations',reservationController)
router.post('reservations',reservationController)
router.put('reservations',reservationController)
router.delete('reservations',reservationController)

module.exports = router