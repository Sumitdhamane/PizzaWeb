require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors()); // In prod, configure CORS origin
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/payment", paymentRoutes);

// Health
app.get("/", (req, res) => res.send("PizzaWeb API running"));

// Error handling (simple)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
