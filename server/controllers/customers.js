// const Post = require("../models/Post.js");
const Customers = require("../models/Customer.js");
const Shops = require("../models/Shops.js");
const Measurement = require("../models/Measurement.js");
const { ObjectId } = require("mongodb"); // Import ObjectId to validate MongoDB IDs
const mongoose = require("mongoose"); // Import mongoose

/* CREATE */
const insertNewCustomer = async (req, res) => {
  try {
    const { shopID } = req.params;
    const { fullName, phoneNumber, measurements = [] } = req.body;

    console.log(req.body);

    // Validate shopID
    if (!mongoose.Types.ObjectId.isValid(shopID)) {
      return res.status(400).json({ message: "Invalid shopID!" });
    }

    const shop = await Shops.findById(shopID);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Ensure measurements is an array of objects
    if (
      !Array.isArray(measurements) ||
      measurements.some((m) => typeof m !== "object")
    ) {
      return res
        .status(400)
        .json({ message: "Measurements must be an array of objects!" });
    }

    const newCustomer = new Customers({
      fullName,
      phoneNumber,
      measurements,
    });

    // Insert the new customer into the database
    await newCustomer.save();

    // Add the new customer to the shop's customers array
    shop.customers.push(newCustomer._id);

    // Save the changes to the shop document
    await shop.save();

    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { shopID, customerID } = req.params;
    const { fullName, phoneNumber, measurements } = req.body;

    if (!ObjectId.isValid(shopID) || !ObjectId.isValid(customerID)) {
      return res.status(400).json({ message: "Invalid shop or customer ID" });
    }

    const shop = await Shops.findById(shopID);
    if (!shop || !shop.customers.includes(customerID)) {
      return res.status(404).json({ message: "Shop or customer not found" });
    }

    const updatedCustomer = await Customers.findByIdAndUpdate(
      customerID,
      { fullName, phoneNumber, measurements },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { shopID, customerID } = req.params;

    if (!ObjectId.isValid(shopID) || !ObjectId.isValid(customerID)) {
      return res.status(400).json({ message: "Invalid shop or customer ID" });
    }

    const shop = await Shops.findById(shopID);
    if (!shop || !shop.customers.includes(customerID)) {
      return res.status(404).json({ message: "Shop or customer not found" });
    }

    const deletedCustomer = await Customers.findByIdAndDelete(customerID);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    shop.customers.pull(customerID);
    await shop.save();

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  insertNewCustomer,
  updateCustomer,
  deleteCustomer,
};
