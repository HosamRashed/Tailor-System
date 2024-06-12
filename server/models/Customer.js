const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  measurements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Measurement",
      default: [],
    },
  ],
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
