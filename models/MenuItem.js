const mongoose = require('mongoose')

const MenuItem = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    availability:{
        type: String,
        required: true,
    }
})

const MenuItemModel = mongoose.model('Menu', MenuItem)
module.exports = MenuItemModel