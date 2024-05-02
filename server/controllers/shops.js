// const Post = require("../models/Post.js");
const Shops = require("../models/Shops.js");

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
    const shop = await Shops.find({ shopID });
    res.status(200).json(shop);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// /* UPDATE */
// export const likePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId } = req.body;
//     const post = await Post.findById(id);
//     const isLiked = post.likes.get(userId);

//     if (isLiked) {
//       post.likes.delete(userId);
//     } else {
//       post.likes.set(userId, true);
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

module.exports = {
  createShop,
  getShops,
  getSpecificShop,
};
