const mongoose = require("mongoose");
const Customers = require("./Customer");

const shopsSchema = mongoose.Schema(
  {
    shopStatus: {
      type: Boolean,
      default: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    shopPhoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    shopPassword: {
      type: String,
      required: true,
      min: 6,
    },
    shopAddress: {
      type: String,
      required: true,
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Shops = mongoose.model("Shops", shopsSchema);

module.exports = Shops;
