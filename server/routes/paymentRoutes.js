const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-order", protect, createOrder); // user must be logged in to create order
router.post("/verify", protect, verifyPayment);

module.exports = router;
