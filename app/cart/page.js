"use client";
import React, { useState } from "react";
import { useAddcart } from "../_components/_context/addCart";
import { Card, Col, Row, Button, Modal } from "react-bootstrap";

const CartPage = () => {
  const { add, setAdd } = useAddcart();
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Remove item from cart
  const handleRemove = (productId) => {
    const updatedCart = add.filter((product) => product._id !== productId);
    setAdd(updatedCart);
  };

  // Show product details in modal
  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  return (
    <div className="container">
      <h2 className="mt-4 text-center">Your Cart</h2>
      {add && add.length > 0 ? (
       <Row xs={1} md={2} lg={3} className="g-3 justify-content-center">
       {add.map((product, index) => (
         <Col key={`${product._id}-${index}`} className="d-flex justify-content-center">
           <Card className="shadow-sm p-2 text-center rounded-3 border-0" style={{ width: "95%", maxWidth: "300px" }}>
             <Card.Img
               variant="top"
               src={product.images?.[0] || "/placeholder.jpg"}
               alt={product.name}
               style={{ height: "150px", objectFit: "cover", borderRadius: "10px" }}
             />
             <Card.Body className="d-flex flex-column p-2">
               <Card.Title className="fw-bold small text-truncate">{product.name}</Card.Title>
               <Card.Text className="fw-bold small text-muted">Price: ${product.price}</Card.Text>
               <div className="mt-auto">
                 <Button block variant="info" className="mb-2 w-100" onClick={() => handleShowDetails(product)}>
                   View Details
                 </Button>
                 <Button block variant="danger" className="w-100" onClick={() => handleRemove(product._id)}>
                   Remove
                 </Button>
               </div>
             </Card.Body>
           </Card>
         </Col>
       ))}
     </Row>
     
      ) : (
        <p className="text-center mt-4">Your cart is empty!</p>
      )}

      {/* Modal for Product Details */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedProduct?.images?.[0] || "/placeholder.jpg"}
            alt={selectedProduct?.name}
            className="img-fluid mb-3 rounded"
            style={{ height: "250px", objectFit: "cover", width: "100%" }}
          />
          <p><strong>Price:</strong> ${selectedProduct?.price}</p>
          <p><strong>Description:</strong> {selectedProduct?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartPage;
