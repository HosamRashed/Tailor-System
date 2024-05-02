const mongoose = require("mongoose");

const measurmentSchema = new mongoose.Schema({
  customerID: {
    type: 'string',
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  Date: {
    type: Date,
    required: true,
  },
  NumberOfThoabs: {
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
  hight: {
    type: Number,
    required: true,
  },
  shoulder: {
    type: Number,
    required: true,
  },
  arm: {
    type: {
      Length: {
        type: Number,
      },
      WidthTopPart: {
        type: Number,
      },
      WidthMiddlePart: {
        type: Number,
      },
    },
  },
  wrist: {
    type: {
      Hight: {
        type: Number,
      },
      width: {
        type: Number,
      },
      shapeType: {
        type: String,
      },
    },
  },
  bodyWith: {
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
  Neck: {
    type: {
      typeOfNeck: {
        type: String,
        required: true,
      },
      width: { type: Number, required: true },
      hight: { type: Number, required: true },
    },
  },
  jbjorHight: {
    type: Number,
    required: true,
  },
  additionalRequiements: {
    type: String,
    required: true,
  },
});

const Measurment = mongoose.model("Measurment", measurmentSchema);
module.exports = Measurment;
