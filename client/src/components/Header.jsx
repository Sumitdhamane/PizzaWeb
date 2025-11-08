import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/header.css";

export default function Header() {
  const { user, logout, cart } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="pw-header">
      <div className="container">
        <Link className="logo" to="/">
          PizzaWeb
        </Link>
        <nav>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart ({cart.reduce((s, i) => s + i.qty, 0)})</Link>
          {user ? (
            <>
              <span className="user-name">Hi, {user.name}</span>
              <button className="btn-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
