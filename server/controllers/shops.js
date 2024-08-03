// const Post = require("../models/Post.js");
const Shops = require("../models/Shops.js");
const bcrypt = require("bcrypt");
const Trader = require("../models/Trader.js");
const Customer = require("../models/Customer.js");

const { ObjectId } = require("mongodb"); // Import ObjectId to validate MongoDB IDs

/* CREATE */
const createShop = async (req, res) => {
  try {
    // Extract shop data from request body
    const { shopID, shopName, shopPhoneNumber, shopAddress } = req.body;

    // Check if shopPhoneNumber is unique
    const existingShop = await Shops.findOne({ shopPhoneNumber });
    if (existingShop) {
      return res
        .status(409)
        .json({ message: "Shop phone number already exists" });
    }

    // Create new shop instance
    const newShop = new Shops({
      shopID,
      shopName,
      shopPhoneNumber,
      shopAddress,
    });

    // Save the new shop to the database
    await newShop.save();

    // Respond with success status and the created shop
    res.status(201).json(newShop);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};

/* READ */
const getShops = async (req, res) => {
  try {
    const shops = await Shops.find();
    res.status(200).json(shops);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getSpecificShop = async (req, res) => {
  try {
    const { shopID } = req.params;
    const shop = await Shops.findById(shopID);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getActive_shops = async (req, res) => {
  try {
    const activeShops = await Shops.find({ status: true });
    res.status(200).json(activeShops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateShopInfo = async (req, res) => {
  try {
    const { shopID } = req.params;
    const { shopName, shopPhoneNumber, shopAddress, shopStatus, shopPassword } =
      req.body;

    if (!ObjectId.isValid(shopID)) {
      return res.status(400).json({ message: "Invalid shop ID" });
    }

    const shop = await Shops.findById(shopID);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found!" });
    }

    if (shopPassword) {
      const salt = await bcrypt.genSalt();
      const passwordhash = await bcrypt.hash(shopPassword, salt);
      req.body.shopPassword = passwordhash;
    }

    const updatedShop = await Shops.findByIdAndUpdate(shopID, req.body, {
      new: true,
    });

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json(updatedShop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateShopStatus = async (req, res) => {
  try {
    const { shopID } = req.params; // Extract the shopID from the request parameters
    const { status } = req.body; // Extract the new status from the request body

    console.log(status);
    // Validate the status input
    if (typeof status !== "boolean") {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Validate the shopID
    if (!ObjectId.isValid(shopID)) {
      return res.status(400).json({ message: "Invalid shop ID" });
    }

    // Convert shopID to ObjectId
    const objectId = new ObjectId(shopID);

    // Update the shop's status
    const updatedShop = await Shops.findById(objectId);
    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Update the status field
    updatedShop.shopStatus = status !== undefined ? status : measurement.status;
    await updatedShop.save();

    console.log(updatedShop.shopStatus);

    res.status(200).json(updatedShop); // Send the updated shop as the response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
};
const deleteShop = async (req, res) => {
  try {
    const { shopID } = req.params; // Extract the shopID from the request parameters

    // Validate the shopID
    if (!ObjectId.isValid(shopID)) {
      return res.status(400).json({ message: "Invalid shop ID" });
    }

    // Convert shopID to ObjectId
    const objectId = new ObjectId(shopID);

    // Delete related traders and customers
    await Trader.deleteMany({ shopID: objectId });
    await Customer.deleteMany({ shopID: objectId });

    // Delete the shop
    const deletedShop = await Shops.findOneAndDelete({ _id: objectId });

    if (!deletedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res
      .status(200)
      .json({ message: "Shop deleted successfully", shop: deletedShop }); // Send the deleted shop as the response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
};

module.exports = {
  createShop,
  getShops,
  getSpecificShop,
  getActive_shops,
  updateShopStatus,
  updateShopInfo,
  deleteShop,
};
