const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
  numberOfThoabs: {
    type: Number,
    default: 1,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  partialPaid: {
    type: Number,
    default: 0,
  },
  paymentCompleted: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    required: true,
  },
  shoulder: {
    type: Number,
    required: true,
  },
  arm: {
    length: {
      type: Number,
    },
    widthTopPart: {
      type: Number,
    },
    widthMiddlePart: {
      type: Number,
    },
  },
  wrist: {
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    shapeType: {
      type: String,
    },
  },
  bodyWidth: {
    type: Number,
    required: true,
  },
  chestWidth: {
    type: Number,
    required: true,
  },
  bottomThobWidth: {
    type: Number,
    required: true,
  },
  neck: {
    typeOfNeck: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  jbjorHeight: {
    type: Number,
    required: true,
  },
  additionalRequirements: {
    type: String,
    required: false,
  },
});

const customerSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  measurements: {
    type: [measurementSchema],
    required: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
