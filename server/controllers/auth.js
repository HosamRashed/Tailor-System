const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Shops = require("../models/Shops.js");
const User = require("../models/User.js");

// /* create a shop */
const createShop = async (req, res) => {
  try {
    // Extract shop data from request body
    const { shopName, shopPhoneNumber, shopAddress, shopPassword } = req.body;

    // Check if shopPhoneNumber is unique
    const existingShop = await Shops.findOne({ shopPhoneNumber });
    if (existingShop) {
      return res.status(409).json({
        message: "there is a Shop with the same  phone number already exists",
      });
    }

    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(shopPassword, salt);

    // Create new shop instance
    const newShop = new Shops({
      shopStatus: true,
      shopPassword: passwordhash,
      shopName,
      shopPhoneNumber,
      shopAddress,
    });

    // Save the new shop to the database
    const createdShop = await newShop.save();

    // Respond with success status and the created shop
    res.status(201).json(createdShop);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};

/* Shop LOGGING IN */
const loginShop = async (req, res) => {
  try {
    console.log("inside login api body");
    const { phoneNumber, password } = req.body;
    const shop = await Shops.findOne({ shopPhoneNumber: phoneNumber });
    if (!shop) return res.status(400).json({ msg: "Shop does not exist." });

    const isMatch = await bcrypt.compare(password, shop.shopPassword);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: shop._id }, process.env.JWT_SECRET);
    delete shop.shopPassword; // Ensure you delete `shopPassword` not `password`
    res.status(200).json({ token, shop });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "there is another User with the same email",
      });
    }
    const newUser = new User({
      email,
      password: passwordhash,
      phoneNumber,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) res.status(400).json({ error: "user not found" });

    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) res.status(400).json({ error: "invalid credintials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETAdmin);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createShop,
  loginShop,
  registerAdmin,
  loginAdmin,
};
