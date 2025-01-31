"use client";
import React, { useContext, useState, createContext, useEffect } from "react";

const AddcartContext = createContext();

const Addcart = ({ children }) => {
  const [add, setAdd] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(add));
  }, [add]);

  return (
    <AddcartContext.Provider value={{ add, setAdd }}>
      {children}
    </AddcartContext.Provider>
  );
};

const useAddcart = () => useContext(AddcartContext);

export { Addcart, useAddcart };
