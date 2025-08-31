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
    category:{
        type: String,
        enum: ["Fast Food", "Desi Food"],
        default: 'Fast Food',
        required: true,
    }, 
    availability:{
        type: String,
        required: true,
    }
})

const MenuItemModel = mongoose.Model('Menu', MenuItem)
module.exports = MenuItemModel