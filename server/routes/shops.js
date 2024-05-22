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
  getAllMeasurements,
} = require("../controllers/measurement");

const { verifyToken, verifyTokenWeb } = require("../middleware/auth");

const router = express.Router();

/* UPDATE shop's info */
router.patch("/:shopID/status", verifyTokenWeb, updateShopStatus); // add validation

/* Delete shop */
router.delete("/:shopID", verifyTokenWeb, deleteShop);

/* retrieve existing shops */
router.get("/", verifyTokenWeb, getShops);
router.get("/active_shops", verifyTokenWeb, getActive_shops);
router.get("/:shopID", verifyTokenWeb, getSpecificShop); // web

// insert update delete customers into the shop
router.post("/:shopID/customers/insert", verifyToken, insertNewCustomer); // new customer.
router.put("/:shopID/customers/:customerID", verifyToken, updateCustomer); // update a customer's info.
router.delete("/:shopID/customers/:customerID", verifyToken, deleteCustomer); // delete a customer

// retrieving shop's customers and their info
router.get("/:shopID/customers/", verifyToken, getAllShopcustomer);
router.post(
  "/:shopID/customers/findCustomerByName",
  verifyToken,
  findCustomersByName
);
router.post(
  "/:shopID/customers/findCustomerByPhoneNumber",
  verifyToken,
  findCustomersByPhoneNumber
);

// insert update delete measurments into a specific customer's info
router.post(
  "/:shopID/:customerID/measurments/insert",
  verifyToken,
  insertNewMeasurement
);
router.put(
  "/:shopID/:customerID/measurments/:measurementID",
  verifyToken,
  updateMeasurement
);
router.get(
  "/:shopID/:customerID/measurments/",
  verifyToken,
  getAllMeasurements
);
router.delete(
  "/:shopID/:customerID/measurments/:measurementID",
  verifyToken,
  deleteMeasurement
);

// export default router;
module.exports = router;
