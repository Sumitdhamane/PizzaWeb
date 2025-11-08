const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  price: { type: Number, required: true }, // rupees
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
