// import express from "express";
const express = require("express");
const {
  getSpecificShop,
  getShops,
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
  getSpecificMeasurement,
  updateMeasurement,
  deleteMeasurement,
  getAllMeasurements,
} = require("../controllers/measurement");

const {
  insertNewTrader,
  deleteTrader,
  updateTrader,
  getTrader,
  getTraders,
  insertPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/trader");

const { verifyToken, verifyTokenWeb } = require("../middleware/auth");

const router = express.Router();

/* UPDATE shop's info */
router.patch("/:shopID/status", verifyTokenWeb, updateShopStatus); // add validation

/* Delete shop */
router.delete("/:shopID", verifyTokenWeb, deleteShop);

/* retrieve existing shops */
router.get("/", verifyTokenWeb, getShops);
router.get("/active_shops", getActive_shops);
router.get("/:shopID", getSpecificShop); // web

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
router.get("/:shopID/:customerID/measurments/", getAllMeasurements);
router.get(
  "/:shopID/:customerID/measurments/:measurmentID",
  getSpecificMeasurement
);
router.delete(
  "/:shopID/:customerID/measurments/:measurementID",
  deleteMeasurement
);

// shops' traders
router.post("/:shopID/traders/insert", insertNewTrader); // new trader.
router.delete("/:shopID/traders/:traderID", deleteTrader); // delete a trader
router.patch("/:shopID/traders/:traderID", updateTrader); // update a trader's info.
router.get("/:shopID/traders/", getTraders);
router.get("/:shopID/traders/:traderID", getTrader);

// shops' traders payments
router.post("/:shopID/traders/:traderID/insert", insertPayment); // new customer.
router.put("/:shopID/traders/:traderID/:paymentID", updatePayment); // new customer.
router.delete("/:shopID/traders/:traderID/:paymentID", deletePayment); // new customer.

// // insert update delete measurments into a specific trader's info
// router.post(
//   "/:shopID/:traderID/payements/insert",
//   verifyToken,
//   insertNewPayment
// );
// router.put(
//   "/:shopID/:traderID/payments/:paymentID",
//   verifyToken,
//   updatepayment
// );
// router.get("/:shopID/:traderID/payments/", verifyToken, getAllPayments);
// router.delete(
//   "/:shopID/:traderID/payments/:paymentID",
//   verifyToken,
//   deletePayment
// );

// export default router;
module.exports = router;
