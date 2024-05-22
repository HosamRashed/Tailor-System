const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Shops = require("../models/Shops.js");

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

// /* create admin account */
// export const register = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       picturePath,
//       friends,
//       location,
//       occupation,
//     } = req.body;

//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: passwordHash,
//       picturePath,
//       friends,
//       location,
//       occupation,
//       viewedProfile: Math.floor(Math.random() * 10000),
//       impressions: Math.floor(Math.random() * 10000),
//     });
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

/* Shop LOGGING IN */
const loginShop = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const shop = await Shops.findOne({ shopPhoneNumber: phoneNumber });
    if (!shop) return res.status(400).json({ msg: "Shop does not exist." });

    const isMatch = await bcrypt.compare(password, shop.shopPassword);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: shop._id }, process.env.JWT_SECRET);
    delete shop.password;
    res.status(200).json({ token, shop });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createShop,
  loginShop,
};
