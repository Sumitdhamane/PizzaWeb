import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/menu.css";

export default function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/pizzas")
      .then((res) => {
        setPizzas(res.data);
      })
      .catch((err) => {
        console.error("Failed to load pizzas", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className="pw-menu">
      <h2>Menu</h2>
      <div className="grid">
        {pizzas.map((p) => (
          <div key={p._id} className="pizza-card">
            <div className="pizza-img">
              {p.image ? (
                <img src={p.image} alt={p.name} />
              ) : (
                <div className="placeholder">Image</div>
              )}
            </div>
            <div className="pizza-body">
              <h3>{p.name}</h3>
              <p className="desc">{p.description}</p>
              <div className="row">
                <strong>₹{p.price}</strong>
                <button onClick={() => addToCart(p)}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
