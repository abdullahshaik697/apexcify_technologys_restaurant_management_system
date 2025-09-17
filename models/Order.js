const mongoose  =  require('mongoose')

const Order = new mongoose.Schema({
  tableNumber: { 
    type: Number,   // ✅ Number hi rakho
    required: true
  },
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
        min: 1
      }
    }
  ],
  status: {
    type: String,
    enum: ["pending", "served", "completed", "cancelled"],
    default: "pending"
  },
  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const OrderModel = mongoose.model('Orders', Order)

module.exports = OrderModel



