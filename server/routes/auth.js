const express = require("express");
const {
  loginShop,
  createShop,
  registerAdmin,
  loginAdmin,
} = require("../controllers/auth.js");
const { verifyTokenWeb } = require("../middleware/auth.js");

const router = express.Router();

// add authintication step to the following

router.post("/loginShop", loginShop);
router.post("/createShop", verifyTokenWeb, createShop);
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);

module.exports = router;
