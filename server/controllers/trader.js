const Shops = require("../models/Shops.js");
const Trader = require("../models/Trader.js");
const { ObjectId } = require("mongodb"); // Import ObjectId to validate MongoDB IDs
const mongoose = require("mongoose"); // Import mongoose

/* CREATE */
const insertNewTrader = async (req, res) => {
  try {
    const { shopID } = req.params;
    const { name, phoneNumber, moneyAmount, payments = [] } = req.body;

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
      payments,
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

const updateTrader = async (req, res) => {
  try {
    const { shopID, traderID } = req.params;
    const { name, phoneNumber, moneyAmount } = req.body;

    if (!ObjectId.isValid(shopID) || !ObjectId.isValid(traderID)) {
      return res.status(400).json({ message: "Invalid shop or trader ID" });
    }
    const shop = await Shops.findById(shopID);
    if (!shop || !shop.traders.includes(traderID)) {
      return res.status(404).json({ message: "Shop or trader not found" });
    }

    const updatedTrader = await Trader.findByIdAndUpdate(
      traderID,
      { name, phoneNumber, moneyAmount },
      { new: true }
    );

    if (!updatedTrader) {
      return res
        .status(404)
        .json({ message: "Trader not found in the database" });
    }

    res.status(200).json(updatedTrader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTrader = async (req, res) => {
  try {
    const { shopID, traderID } = req.params;

    if (!ObjectId.isValid(shopID) || !ObjectId.isValid(traderID)) {
      return res.status(400).json({ message: "Invalid shop or customer ID" });
    }

    const shop = await Shops.findById(shopID);
    if (!shop || !shop.traders.includes(traderID)) {
      return res.status(404).json({ message: "Shop or trader not found" });
    }

    const deletedTrader = await Trader.findByIdAndDelete(traderID);
    if (!deletedTrader) {
      return res.status(404).json({ message: "Trader not found" });
    }

    shop.traders.pull(traderID);
    await shop.save();

    res.status(200).json({ message: "Trader deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTraders = async (req, res) => {
  try {
    const { shopID } = req.params;

    // Validate shopID
    if (!mongoose.Types.ObjectId.isValid(shopID)) {
      return res.status(400).json({ message: "Invalid shopID!" });
    }

    // Find the shop by ID and populate the traders
    const shop = await Shops.findById(shopID).populate("traders");
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Return the traders array
    res.status(200).json(shop.traders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTrader = async (req, res) => {
  try {
    const { shopID, traderID } = req.params;

    // Validate shopID
    if (!mongoose.Types.ObjectId.isValid(shopID)) {
      return res.status(400).json({ message: "Invalid shopID!" });
    }

    if (!mongoose.Types.ObjectId.isValid(traderID)) {
      return res.status(400).json({ message: "Invalid traderID!" });
    }

    const shop = await Shops.findById(shopID).populate("traders");
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Find trader with matching traderID in the specific shop
    const matchedTrader = shop.traders.find(
      (trader) => trader._id.toString() === traderID
    );

    if (!matchedTrader) {
      return res.status(404).json({ message: "Trader not found" });
    }

    res.status(200).json(matchedTrader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const insertPayment = async (req, res) => {
  try {
    const { shopID, traderID } = req.params;
    const { paymentAmount, notes } = req.body;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(traderID)
    ) {
      return res.status(400).json({ message: "Invalid ID!" });
    }

    const shop = await Shops.findById(shopID).populate("traders");
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const trader = shop.traders.find(
      (trader) => trader._id.toString() === traderID
    );
    if (!trader) {
      return res.status(404).json({ message: "Trader not found" });
    }

    trader.payments.push({
      paymentAmount,
      notes,
      date: new Date(),
    });

    await trader.save();
    res.status(201).json(trader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { shopID, traderID, paymentID } = req.params;
    const { paymentAmount, notes } = req.body;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(traderID) ||
      !mongoose.Types.ObjectId.isValid(paymentID)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid shop, trader, or payment ID" });
    }

    // Find the shop and populate the traders
    const shop = await Shops.findById(shopID).populate("traders");
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Find the trader within the shop
    const trader = shop.traders.find(
      (trader) => trader._id.toString() === traderID
    );
    if (!trader) {
      return res.status(404).json({ message: "Trader not found" });
    }

    // Find the payment within the trader's payments array
    const payment = trader.payments.id(paymentID);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update the payment fields
    if (paymentAmount !== undefined) payment.paymentAmount = paymentAmount;
    if (notes !== undefined) payment.notes = notes;

    // Save the updated trader
    await trader.save();

    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { shopID, traderID, paymentID } = req.params;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(shopID) ||
      !mongoose.Types.ObjectId.isValid(traderID) ||
      !mongoose.Types.ObjectId.isValid(paymentID)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid shop, trader, or payment ID" });
    }

    // Find the shop and populate the traders
    const shop = await Shops.findById(shopID).populate("traders");
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Find the trader within the shop
    const trader = shop.traders.find(
      (trader) => trader._id.toString() === traderID
    );
    if (!trader) {
      return res.status(404).json({ message: "Trader not found" });
    }

    // Find the payment within the trader's payments array
    const payment = trader.payments.id(paymentID);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Remove the payment
    trader.payments.pull(paymentID);

    // Save the updated trader
    await trader.save();

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  insertNewTrader,
  deleteTrader,
  updateTrader,
  getTraders,
  getTrader,
  insertPayment,
  updatePayment,
  deletePayment,
};
