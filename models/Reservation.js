const mongoose = require('mongoose')

const Reservation = new 
mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        
    },
    tableNumber: {
        type: Number,
        required: true,
    },
    reservationTime: {
        type: Date,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['reserved', 'completed', 'cancelled'],
        default: 'reserved'
    }
})

const ReservationModel = mongoose.model("Reservation", Reservation);
module.exports = ReservationModel;