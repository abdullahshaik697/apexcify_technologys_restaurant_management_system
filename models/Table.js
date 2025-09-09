const mongoose = require('mongoose')

const Table = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: String,
        enum: ['available', 'not available'],
        default: 'available',
    }
})

const TableModel = mongoose.model("Table", Table);
module.exports = TableModel;