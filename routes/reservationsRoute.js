const express =  require('express')
const { showReservations, addReservation, updateReservation, deleteReservation } = require('../controllers/reservationController')
const router = express.Router()

router.get('/',showReservations)
router.post('/',addReservation)
router.put('/',updateReservation)
router.delete('/',deleteReservation)

module.exports = router