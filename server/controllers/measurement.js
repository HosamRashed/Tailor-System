// const Post = require("../models/Post.js");
const Customers = require("../models/Customer.js");
const Shops = require("../models/Shops.js");
const Measurement = require("../models/Measurement.js");
const { ObjectId } = require("mongodb"); // Import ObjectId to validate MongoDB IDs
const mongoose = require("mongoose"); // Import mongoose

/* CREATE */

const insertNewMeasurement = async (req, res) => {
  try {
    const { shopID, customerID } = req.params;
    const { fullName, ...measurementData } = req.body;

    // Validate IDss
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

    const newMeasurement = new Measurement({
      customerID,
      fullName,
      ...measurementData,
    });

    customer.measurements.push(newMeasurement._id);
    shop.thoabs.push(newMeasurement._id);

    await customer.save();
    await shop.save();
    await newMeasurement.save();

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

    // Find and update the measurement
    const measurement = await Measurement.findById(measurementID);
    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    // Update the measurement fields
    Object.assign(measurement, updatedMeasurement);
    await customer.save();
    await measurement.save();

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMeasurementStatus = async (req, res) => {
  try {
    const { shopID, customerID, measurementID } = req.params;
    const { status } = req.body; // Assuming status is sent in the request body
    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(customerID) ||
      !mongoose.Types.ObjectId.isValid(measurementID)
    ) {
      return res.status(400).json({ message: "Invalid IDs!" });
    }

    // Find and update the measurement
    const measurement = await Measurement.findById(measurementID);
    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    // Update the status field
    measurement.status = status !== undefined ? status : measurement.status;
    await measurement.save();

    res.status(200).json(measurement);
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

    // Find and remove the measurement from the database
    const measurement = await Measurement.findByIdAndDelete(measurementID);
    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    // Remove the measurement reference from the customer's measurements array
    customer.measurements.pull({ _id: measurementID });
    await customer.save();

    // Remove the measurement reference from the shop's thoabs array
    shop.thoabs.pull({ _id: measurementID });
    await shop.save();

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
    const customer = await Customers.findById(customerID).populate(
      "measurements"
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer.measurements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDateRangeMeasurements = async (req, res) => {
  try {
    const { shopID } = req.params;
    const { fromDate, toDate } = req.query;

    // Validate shopID
    if (!mongoose.Types.ObjectId.isValid(shopID)) {
      return res.status(400).json({ message: "Invalid shopID!" });
    }

    // Validate date range
    if (!fromDate || !toDate) {
      return res
        .status(400)
        .json({ message: "fromDate and toDate are required!" });
    }

    // Convert dates to Date objects
    const fromDateObj = new Date(fromDate);
    let toDateObj = new Date(toDate);
    toDateObj.setHours(23, 59, 59, 999); // Set to end of the day

    // Ensure dates are valid
    if (isNaN(fromDateObj) || isNaN(toDateObj)) {
      return res.status(400).json({ message: "Invalid date format!" });
    }

    // Find the shop and populate the thoabs within the date range
    const shop = await Shops.findById(shopID).populate({
      path: "thoabs",
      match: { date: { $gte: fromDateObj, $lte: toDateObj } },
    });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json(shop.thoabs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSpecificMeasurement = async (req, res) => {
  try {
    const { shopID, customerID, measurementID } = req.params;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(customerID) ||
      !mongoose.Types.ObjectId.isValid(measurementID)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid shopID, customerID or measurementID!" });
    }

    // Find the shop
    const shop = await Shops.findById(shopID);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Find the customer and populate measurements
    const customer = await Customers.findById(customerID).populate(
      "measurements"
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Find the specific measurement
    const measurement = customer.measurements.find(
      (m) => m._id.toString() === measurementID
    );
    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json(measurement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDateRangeMeasurements,
  insertNewMeasurement,
  getSpecificMeasurement,
  updateMeasurement,
  deleteMeasurement,
  getAllMeasurements,
  updateMeasurementStatus,
};
