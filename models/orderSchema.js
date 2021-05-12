const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  orderItems: [
    {
    _id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
    },
  ],
 
  userDetails: {
    
      email: { type: String, required: true },
      name: { type: String, required: true },
      phone: { type: Number, required: true },
    },
  
    orderTime: { type: Date, required: true },
    paymentId: {
        type: String,
        required: true,
  },
});

const Order =mongoose.model('ORDER', orderSchema);

module.exports = Order;