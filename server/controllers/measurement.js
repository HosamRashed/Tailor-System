// const Post = require("../models/Post.js");
const Customers = require("../models/Customer.js");
const Shops = require("../models/Shops.js");
const Measurement = require("../models/Measurement.js");
const { ObjectId } = require("mongodb"); // Import ObjectId to validate MongoDB IDs
const mongoose = require("mongoose"); // Import mongoose

/* CREATE */
const insertNewMeasurement = async (req, res) => {
  //   "/:shopID/customers/:customerID/measurments/insert",
  try {
    const { shopID, customerID } = req.params;
    const measurementData = req.body;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(customerID)
    ) {
      return res.status(400).json({ message: "Invalid shopID or customerID!" });
    }

    const shop = await Shops.findById(shopID);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const customer = await Customers.findById(customerID);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const newMeasurement = new Measurement(measurementData);
    customer.measurements.push(newMeasurement);
    await customer.save();

    res.status(201).json(newMeasurement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMeasurement = async (req, res) => {
  try {
    const { shopID, customerID, measurementID } = req.params;
    const updatedMeasurement = req.body;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(customerID) ||
      !mongoose.Types.ObjectId.isValid(measurementID)
    ) {
      return res.status(400).json({ message: "Invalid IDs!" });
    }

    // Find the shop
    const shop = await Shops.findById(shopID);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Find the customer
    const customer = await Customers.findById(customerID);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Convert measurementID to ObjectId
    const measurementObjectId = new mongoose.Types.ObjectId(measurementID);

    // Find and update the measurement
    const measurement = customer.measurements.id(measurementObjectId);
    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    // Update the measurement fields
    Object.assign(measurement, updatedMeasurement);
    await customer.save();

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMeasurement = async (req, res) => {
  try {
    const { shopID, customerID, measurementID } = req.params;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(customerID) ||
      !mongoose.Types.ObjectId.isValid(measurementID)
    ) {
      return res.status(400).json({ message: "Invalid IDs!" });
    }

    // Find the shop
    const shop = await Shops.findById(shopID);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Find the customer
    const customer = await Customers.findById(customerID);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Remove the measurement using pull
    customer.measurements.pull({ _id: measurementID });

    // Save the customer
    await customer.save();

    res.status(200).json({ message: "Measurement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllMeasurements = async (req, res) => {
  try {
    const { shopID, customerID } = req.params;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(customerID)
    ) {
      return res.status(400).json({ message: "Invalid shopID or customerID!" });
    }

    // Find the shop
    const shop = await Shops.findById(shopID);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Find the customer
    const customer = await Customers.findById(customerID);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer.measurements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  insertNewMeasurement,
  updateMeasurement,
  deleteMeasurement,
  getAllMeasurements,
};
