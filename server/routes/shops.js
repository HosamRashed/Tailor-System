// import express from "express";
const express = require("express");
const {
  getSpecificShop,
  getShops,
  createShop,
} = require("../controllers/shops");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// // /* READ */
router.get("/", getShops);
router.get("/:shopID", getSpecificShop);

// Create
router.post("/create", createShop);

// /* UPDATE */
// router.patch("/:id/like", verifyToken, likePost);

// export default router;
module.exports = router;
