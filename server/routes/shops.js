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
  getAllShopcustomer,
} = require("../controllers/customers");

const {
  insertNewMeasurement,
  updateMeasurement,
  deleteMeasurement,
} = require("../controllers/measurement");

const { verifyToken } = require("../middleware/auth");

const router = express.Router();

/* Create new shop */
router.post("/create", createShop);

/* UPDATE shop's info */
router.patch("/:shopID/status", updateShopStatus); // add validation
// router.patch("/", verifyToken, likePost);

/* Delete shop */
router.delete("/:shopID", deleteShop);

/* retrieve existing shops */
router.get("/", getShops);
router.get("/active_shops", getActive_shops);
router.get("/:shopID", getSpecificShop);

// insert update delete customers into the shop
router.post("/:shopID/customers/insert", insertNewCustomer); // new customer.
router.put("/:shopID/customers/:customerID", updateCustomer); // update a customer's info.
router.delete("/:shopID/customers/:customerID", deleteCustomer); // delete a customer

// retrieving shop's customers and their info
router.get("/:shopID/customers/", getAllShopcustomer);
router.post("/:shopID/customers/findCustomerByName", findCustomersByName);
router.post(
  "/:shopID/customers/findCustomerByPhoneNumber",
  findCustomersByPhoneNumber
);

// insert update delete measurments into a specific customer's info
router.post("/:shopID/:customerID/measurments/insert", insertNewMeasurement);
router.put(
  "/:shopID/:customerID/measurments/:measurementID",
  updateMeasurement
);
router.delete(
  "/:shopID/:customerID/measurments/:measurementID",
  deleteMeasurement
);

// export default router;
module.exports = router;
