const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    default: false,
  },
  pageNumber: { type: Number },
  submissionDate: { type: Date },
  date: {
    type: Date,
  },
  numberOfThoabs: {
    type: Number,
    default: 1,
  },
  height: {
    type: Number,
  },
  shoulder: {
    type: Number,
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
  },
  chestWidth: {
    type: Number,
  },
  bottomThobWidth: {
    type: Number,
  },
  neck: {
    typeOfNeck: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  jbjorHeight: {
    type: Number,
  },
  additionalRequirements: {
    type: String,
  },
});

const Measurement = mongoose.model("Measurement", measurementSchema);
module.exports = Measurement;
