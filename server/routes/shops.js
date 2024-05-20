// import express from "express";
const express = require("express");
const {
  getSpecificShop,
  getShops,
  createShop,
  getActive_shops,
  updateShopStatus,
  deleteShop,
} = require("../controllers/shops");
const {
  insertNewCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomersByName,
  findCustomersByPhoneNumber,
} = require("../controllers/customers");

const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// // /* READ */
router.get("/", getShops);
router.get("/active_shops", getActive_shops);
router.get("/:shopID", getSpecificShop);

router.post("/:shopID/customers/insert", insertNewCustomer); // new customer.
router.put("/:shopID/customers/:customerID", updateCustomer); // update a customer's info.
router.delete("/:shopID/customers/:customerID", deleteCustomer); // delete a customer

router.post("/:shopID/customers/findCustomerByName", findCustomersByName);
router.post(
  "/:shopID/customers/findCustomerByPhoneNumber",
  findCustomersByPhoneNumber
);
// Create
router.post("/create", createShop);

/* UPDATE */
router.patch("/:shopID/status", updateShopStatus); // add validation
// router.patch("/", verifyToken, likePost);

/* Delete */
router.delete("/:shopID", deleteShop);

// export default router;
module.exports = router;
