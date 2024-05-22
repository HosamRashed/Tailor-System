const express = require("express");
const { loginShop, createShop } = require("../controllers/auth.js");
// const { loginAdmin } = require("../controllers/auth.js");

const router = express.Router();

router.post("/loginShop", loginShop);
router.post("/createShop", createShop);
// router.post("/loginAdmin", loginAdmin);

module.exports = router;
