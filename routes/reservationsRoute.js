const express = require('express');
const {
  reserveTable,
  cancelReservation,
  completeReservation,
  showReservations
} = require('../controllers/reservationController');

const router = express.Router();

router.get('/', showReservations);
router.post('/', reserveTable);
router.post('/cancel/:id', cancelReservation);
router.post('/complete/:id', completeReservation);



module.exports = router;
