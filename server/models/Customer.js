const mongoose = require("mongoose");
const measurment = require("./Measurment");

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  measurments: [measurment.schema],
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
