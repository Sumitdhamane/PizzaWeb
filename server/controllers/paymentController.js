const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create Razorpay order
 * POST /api/payment/create-order
 * Body: { amount } amount in rupees (number)
 */
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Amount required" });

    const amountInPaise = Math.round(amount * 100); // Razorpay expects paise
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);
    // Return order id and key id (frontend needs key id for checkout)
    res.json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

/**
 * Verify payment and save order
 * POST /api/payment/verify
 * Body: { razorpayPaymentId, razorpayOrderId, razorpaySignature, items, amount }
 * Requires auth
 */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      items,
      amount,
    } = req.body;
    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return res.status(400).json({ message: "Payment details missing" });
    }

    // signature validation
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");

    if (generated_signature !== razorpaySignature) {
      return res
        .status(400)
        .json({ message: "Invalid signature - verification failed" });
    }

    // Save order
    const order = await Order.create({
      user: req.user._id,
      items: items || [],
      amount: amount || 0,
      currency: "INR",
      paymentMethod: "razorpay",
      razorpayOrderId,
      razorpayPaymentId,
      status: "paid",
    });

    res.json({ message: "Payment verified and order saved", order });
  } catch (err) {
    console.error("verifyPayment error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
