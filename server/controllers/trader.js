const Shops = require("../models/Shops.js");
const Trader = require("../models/Trader.js");
const { ObjectId } = require("mongodb"); // Import ObjectId to validate MongoDB IDs
const mongoose = require("mongoose"); // Import mongoose

/* CREATE */
const insertNewTrader = async (req, res) => {
  try {
    const { shopID } = req.params;
    const { name, phoneNumber, moneyAmount } = req.body;

    // Validate shopID
    if (!mongoose.Types.ObjectId.isValid(shopID)) {
      return res.status(400).json({ message: "Invalid shopID!" });
    }

    const shop = await Shops.findById(shopID);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const newTrader = new Trader({
      name,
      phoneNumber,
      moneyAmount,
    });

    // Insert the new customer into the database
    await newTrader.save();

    // Add the new customer to the shop's customers array
    shop.traders.push(newTrader._id);

    // Save the changes to the shop document
    await shop.save();

    res.status(201).json(newTrader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const insertNewPayment = async (req, res) => {
//   //   "/:shopID/customers/:customerID/measurments/insert",
//   try {
//     const { shopID, traderID } = req.params;
//     const paymentData = req.body;

//     // Validate IDs
//     if (
//       !mongoose.Types.ObjectId.isValid(shopID) ||
//       !mongoose.Types.ObjectId.isValid(traderID)
//     ) {
//       return res.status(400).json({ message: "Invalid shopID or traderID!" });
//     }

//     const shop = await Shops.findById(shopID);
//     if (!shop) {
//       return res.status(404).json({ message: "Shop not found" });
//     }

//     const trader = await Customers.findById(customerID);
//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     const newMeasurement = new Measurement(measurementData);
//     customer.measurements.push(newMeasurement);
//     await customer.save();

//     res.status(201).json(newMeasurement);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateMeasurement = async (req, res) => {
//   try {
//     const { shopID, customerID, measurementID } = req.params;
//     const updatedMeasurement = req.body;

//     // Validate IDs
//     if (
//       !mongoose.Types.ObjectId.isValid(shopID) ||
//       !mongoose.Types.ObjectId.isValid(customerID) ||
//       !mongoose.Types.ObjectId.isValid(measurementID)
//     ) {
//       return res.status(400).json({ message: "Invalid IDs!" });
//     }

//     // Find the shop
//     const shop = await Shops.findById(shopID);
//     if (!shop) {
//       return res.status(404).json({ message: "Shop not found" });
//     }

//     // Find the customer
//     const customer = await Customers.findById(customerID);
//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     // Convert measurementID to ObjectId
//     const measurementObjectId = new mongoose.Types.ObjectId(measurementID);

//     // Find and update the measurement
//     const measurement = customer.measurements.id(measurementObjectId);
//     if (!measurement) {
//       return res.status(404).json({ message: "Measurement not found" });
//     }

//     // Update the measurement fields
//     Object.assign(measurement, updatedMeasurement);
//     await customer.save();

//     res.status(200).json(customer);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const deleteMeasurement = async (req, res) => {
//   try {
//     const { shopID, customerID, measurementID } = req.params;

//     // Validate IDs
//     if (
//       !mongoose.Types.ObjectId.isValid(shopID) ||
//       !mongoose.Types.ObjectId.isValid(customerID) ||
//       !mongoose.Types.ObjectId.isValid(measurementID)
//     ) {
//       return res.status(400).json({ message: "Invalid IDs!" });
//     }

//     // Find the shop
//     const shop = await Shops.findById(shopID);
//     if (!shop) {
//       return res.status(404).json({ message: "Shop not found" });
//     }

//     // Find the customer
//     const customer = await Customers.findById(customerID);
//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     // Remove the measurement using pull
//     customer.measurements.pull({ _id: measurementID });

//     // Save the customer
//     await customer.save();

//     res.status(200).json({ message: "Measurement deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getAllMeasurements = async (req, res) => {
//   try {
//     const { shopID, customerID } = req.params;

//     // Validate IDs
//     if (
//       !mongoose.Types.ObjectId.isValid(shopID) ||
//       !mongoose.Types.ObjectId.isValid(customerID)
//     ) {
//       return res.status(400).json({ message: "Invalid shopID or customerID!" });
//     }

//     // Find the shop
//     const shop = await Shops.findById(shopID);
//     if (!shop) {
//       return res.status(404).json({ message: "Shop not found" });
//     }

//     // Find the customer
//     const customer = await Customers.findById(customerID);
//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     res.status(200).json(customer.measurements);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  insertNewTrader,
  //   updateMeasurement,
  //   deleteMeasurement,
  //   getAllMeasurements,
};
