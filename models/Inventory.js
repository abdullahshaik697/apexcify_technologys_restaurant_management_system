const mongoose = require('mongoose')
const Inventory = new mongoose.Schema({

    itemName: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        unit: ['kgs', 'liters', 'pieces'],
        required: true

    },
    threshold:{
        type: Number,
        required: true
    }
})

const InventoryModel = mongoose.model('Inventory', Inventory)
module.exports = InventoryModel