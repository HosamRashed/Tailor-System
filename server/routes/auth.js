const express = require("express");
const {
  loginShop,
  createShop,
  registerAdmin,
  loginAdmin,
} = require("../controllers/auth.js");

const router = express.Router();

router.post("/loginShop", loginShop);
router.post("/createShop", createShop);
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);

module.exports = router;
