const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  pageNumber: { type: Number },
  submissionDate: { type: Date },
  date: {
    type: Date,
    default: Date.now,
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
  armLength: {
    type: Number,
  },
  armWidthTopPart: {
    type: Number,
  },
  armWidthMiddlePart: {
    type: Number,
  },
  wristWidth: {
    type: Number,
  },
  wristHeight: {
    type: Number,
  },
  wristShapeType: {
    type: String,
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
  neckHeight: {
    type: Number,
  },
  neckWidth: {
    type: Number,
  },
  neckType: {
    type: String,
  },
  jbjorHeight: {
    type: Number,
  },
  jbjorType: {
    type: String,
  },
  additionalRequirements: {
    type: String,
  },
});

const Measurement = mongoose.model("Measurement", measurementSchema);
module.exports = Measurement;
