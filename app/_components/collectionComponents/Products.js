"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; 
import { Button, Card, Col, Row } from "react-bootstrap";
import AddCartBtn from "../common/AddCartBtn";
import { handleFetchProduct } from "../../lib/action";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // Get category from URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allData = await handleFetchProduct(); 
        console.log("🔍 API Fetched Products:", allData); // Debugging log

        if (!Array.isArray(allData)) {
          throw new Error("Invalid products response");
        }

        setAllProducts(allData);
      } catch (err) {
        setError("Failed to load products.");
        console.error("🚨 Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []); 

  useEffect(() => {
    console.log("📢 Selected Category from URL:", category); // Debugging log

    if (category) {
      const filtered = allProducts.filter(product => {
        console.log("🔍 Checking Product:", product); // Debugging log
        return product.category && product.category.toLowerCase() === category.toLowerCase();
      });

      console.log("✅ Filtered Products:", filtered); // Debugging log
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [category, allProducts]); 

  return (
    <div>
      <h2 className="mt-4">{category ? `${category} Products` : "All Products"}</h2>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((curEle, index) => (
            <Col key={curEle._id} md={4} className="mb-4">
              <Card className="h-100 shadow">
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={curEle.images?.[0] || "/placeholder.jpg"}
                    alt={curEle.name}
                    className="product-image"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">{curEle.name}</Card.Title>
                  <Card.Text className="flex-grow-1 text-muted">
                    {curEle.description}
                  </Card.Text>
                  <Card.Text className="fw-bold">Price: ${curEle.price}</Card.Text>
                  <AddCartBtn color="primary" classname="py-2" product={curEle} />
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-muted">No products found for this category.</p>
        )}
      </Row>
    </div>
  );
};

export default Products;
