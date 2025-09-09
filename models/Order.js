const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    tableNumber: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Table", 
        required: true },
    items: [
      {
        menuItemId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Menu", 
            required: true 
        },
        quantity: { 
            type: Number,  
            required: true, 
            min: 1 }
      }
    ],
    status: { 
        type: String, 
        enum: ["pending", "served", "completed"], 
        default: "pending" 
    },
    totalAmount: { 
        type: Number, 
        required: true 
    }
  });
  
  const OrderModel = mongoose.model("Order", Order);
module.exports = OrderModel  