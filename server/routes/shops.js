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
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// // /* READ */
router.get("/", getShops);
router.get("/active_shops", getActive_shops);
router.get("/:shopID", getSpecificShop);

// Create
router.post("/create", createShop);

/* UPDATE */
router.patch("/:shopID/status", updateShopStatus); // add validation
// router.patch("/", verifyToken, likePost);

/* Delete */
router.delete("/:shopID", deleteShop);

// export default router;
module.exports = router;
