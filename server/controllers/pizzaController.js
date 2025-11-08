const Pizza = require("../models/Pizza");

/**
 * GET /api/pizzas
 * Returns list of pizzas
 */
exports.getPizzas = async (req, res) => {
  try {
    // If DB empty, optionally create some seed items (first run convenience).
    const count = await Pizza.countDocuments();
    if (count === 0) {
      const seed = [
        {
          name: "Margherita",
          description: "Classic cheese & tomato",
          price: 199,
          image: "",
        },
        {
          name: "Pepperoni",
          description: "Pepperoni & cheese",
          price: 299,
          image: "",
        },
        {
          name: "Veggie Delight",
          description: "Bell pepper, onion, olives",
          price: 249,
          image: "",
        },
      ];
      await Pizza.insertMany(seed);
    }

    const pizzas = await Pizza.find().sort({ createdAt: -1 });
    res.json(pizzas);
  } catch (err) {
    console.error("getPizzas error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
