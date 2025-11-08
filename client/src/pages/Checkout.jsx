import React, { useContext, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/checkout.css";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      if (
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        )
      ) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });

  const handlePayNow = async () => {
    setLoading(true);
    setMessage("");
    try {
      if (cart.length === 0) throw new Error("Cart empty");

      // create order on backend (returns razorpay order id)
      const createRes = await API.post("/payment/create-order", {
        amount: subtotal,
      });
      const { orderId, keyId, amount } = createRes.data;

      await loadRazorpayScript();

      const options = {
        key: keyId,
        amount: amount,
        currency: "INR",
        name: "PizzaWeb",
        description: "Order payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            // send verification to backend
            const payload = {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              items: cart,
              amount: subtotal,
            };
            const verifyRes = await API.post("/payment/verify", payload);
            setMessage("Payment successful! Order placed.");
            clearCart();
            // optionally navigate to orders page or menu
            setTimeout(() => navigate("/"), 1500);
          } catch (err) {
            console.error("verify error", err);
            setMessage(
              err.response?.data?.message || "Payment verification failed"
            );
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: { color: "#F97316" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pw-checkout">
      <h2>Checkout</h2>
      <div className="checkout-box">
        <div>
          <h3>Items</h3>
          <ul>
            {cart.map((i) => (
              <li key={i.pizza}>
                {i.name} x {i.qty} = ₹{i.qty * i.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="summary">
          <h3>Subtotal: ₹{subtotal}</h3>
          <button
            className="primary"
            onClick={handlePayNow}
            disabled={loading || cart.length === 0}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          {message && <p className="info">{message}</p>}
        </div>
      </div>
    </div>
  );
}
