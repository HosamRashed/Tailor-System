const mongoose = require("mongoose");
const Customers = require("./Customer");

const shopsSchema = mongoose.Schema(
  {
    status: {
      type: Boolean,
      required: true,
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
    shopAddress: {
      type: String,
      required: true,
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],
  },
  { timestamps: true }
);

const Shops = mongoose.model("Shops", shopsSchema);

module.exports = Shops;
