const mongoose = require("mongoose");
const Customers = require("./Customer");

const shopsSchema = mongoose.Schema(
  {
    shopID: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
      default: "active"
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
    customers: {
      type: [Customers.schema], // Embedding the Customer schema,
      default: [],
    },
  },
  { timestamps: true }
);

const Shops = mongoose.model("Shops", shopsSchema);

module.exports = Shops;
