import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/cart.css";

export default function Cart() {
  const { cart, updateCartItem, removeFromCart } = useContext(AuthContext);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="pw-cart">
      <h2>Your cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/menu">Browse menu</Link>
        </p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Pizza</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.pizza}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateCartItem(
                          item.pizza,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                    />
                  </td>
                  <td>₹{item.price * item.qty}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.pizza)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h3>Subtotal: ₹{subtotal}</h3>
            <Link to="/checkout">
              <button className="primary">Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
