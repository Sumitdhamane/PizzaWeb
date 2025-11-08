import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("pzw_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("pzw_token") || null
  );

  useEffect(() => {
    if (token) localStorage.setItem("pzw_token", token);
    else localStorage.removeItem("pzw_token");
    if (user) localStorage.setItem("pzw_user", JSON.stringify(user));
    else localStorage.removeItem("pzw_user");
  }, [token, user]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("pzw_token");
    localStorage.removeItem("pzw_user");
  };

  // cart stored in localStorage (simple)
  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem("pzw_cart");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("pzw_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pizza, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.pizza === pizza._id);
      if (found) {
        return prev.map((i) =>
          i.pizza === pizza._id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        { pizza: pizza._id, name: pizza.name, price: pizza.price, qty },
      ];
    });
  };

  const updateCartItem = (pizzaId, qty) => {
    setCart((prev) =>
      prev.map((i) => (i.pizza === pizzaId ? { ...i, qty } : i))
    );
  };

  const removeFromCart = (pizzaId) => {
    setCart((prev) => prev.filter((i) => i.pizza !== pizzaId));
  };

  const clearCart = () => setCart([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
