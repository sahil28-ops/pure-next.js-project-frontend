"use client";
import React from "react";
import { Button } from "react-bootstrap";
import { useAddcart } from "../_context/addCart";

const AddCartBtn = ({ color, classname, product }) => {
  const { add, setAdd } = useAddcart(); 

  const addcart = () => {
    setAdd((prev) => [...prev, product]); // Add the product to the cart state
    // localStorage.setItem("cart", JSON.stringify([...add, product])); // Store cart in localStorage
    alert(`${product.name} added to cart!`);
  };
  console.log(add);
  
  return (
    <Button variant={color} onClick={addcart} className={classname}>
      Add to Cart
    </Button>
  );
};

export default AddCartBtn;
