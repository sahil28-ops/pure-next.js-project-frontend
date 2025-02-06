"use client";
import React from "react";
import { useAddcart } from "../_components/_context/addCart";
import { Card, Col, Row } from "react-bootstrap";

const CartPage = () => {
  const { add } = useAddcart();
  console.log("Cart Data:", add); 

  return (
    <div>
      <h2 className="mt-4">Your Cart</h2>
      {add && add.length > 0 ? (
        <Row xs={1} md={3} className="g-4">
          {add.map((product, index) => (
            <Col key={product._id || index}>
              <Card>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
};

export default CartPage;
/////cart
