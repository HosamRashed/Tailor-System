const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentAmount: { type: Number, required: true },
  notes: { type: String, default: "No Notes" },
  date: { type: Date, default: Date.now },
});

// Define the Traders schema
const tradersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  moneyAmount: {
    type: Number,
    required: true,
  },
  payments: {
    type: [paymentSchema],
    default: [], // Default to an empty array
  },
});

const Traders = mongoose.model("Traders", tradersSchema);

module.exports = Traders;
