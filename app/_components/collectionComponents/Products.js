"use client";
import { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import AddCartBtn from "../common/AddCartBtn";
import { useAddcart } from "../_context/addCart";
import { handleFetchProduct } from "../../lib/action"; // Assuming this fetches the products.

const Products = () => {
  const [products, setProducts] = useState([]);
  const { setAdd } = useAddcart(); // Access setAdd from context

  useEffect(() => {
    const initializeData = async () => {
      try {
        const data = await handleFetchProduct();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    initializeData();
  }, []); 

  return (
    <div>
      <h2 className="mt-4">Products</h2>
      <Row xs={1} md={3} className="g-4">
        {products.map((curEle, index) => (
          <Col key={curEle._id || index}>
            <Card>
              <Card.Body>
                <Card.Title>{curEle.name}</Card.Title>
                <Card.Text>Price: ${curEle.price}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <AddCartBtn
                  color="primary"
                  classname="py-2"
                  product={curEle} // Pass product to AddCartBtn
                />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
