"use client";

import { useState, useEffect } from "react";
import {
  handleFetchProduct,
  handleDeleteProduct,
  handleUpdateProduct,
} from "../../lib/action";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Spinner,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    images: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await handleFetchProduct();
        setProducts(productData || []);
      } catch (err) {
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  const handleShowModal = (product) => {
    setCurrentProduct(product);
    setUpdatedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      images: product.images,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdatedProduct({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      images: "",
    });
  };

  const handleUpdate = async () => {
    try {
      const result = await handleUpdateProduct(
        currentProduct._id,
        updatedProduct
      );
      if (result.success) {
        // Update the product in the list
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === currentProduct._id
              ? { ...product, ...updatedProduct }
              : product
          )
        );
        handleCloseModal();
      } else {
        setError("Failed to update product.");
      }
    } catch (err) {
      setError("Error updating product.");
    }
  };

  const handleDelete = async (id) => {
    const result = await handleDeleteProduct(id);
    if (result.success) {
      // Remove the deleted product from the list
      setProducts(products.filter((product) => product._id !== id));
    } else {
      setError("Failed to delete product.");
    }
  };

  return (
    <Container className="mt-4">
      {/* <h2 className="text-center mb-4">All Products</h2> */}
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {products.length > 0
          ? products.map((product) => (
              <Col key={product._id} md={4} className="mb-4">
                <Card className="h-100 shadow">
                  <div className="image-container">
                    <Card.Img
                      variant="top"
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="flex-grow-1 text-muted">
                      {product.description}
                    </Card.Text>
                    <Card.Text className="fw-bold">
                      Price: ${product.price}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="mt-auto"
                      onClick={() => handleShowModal(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="mt-2"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : !loading && <p className="text-center">No products available</p>}
      </Row>

      {/* Modal for Update Product */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="productCategoryId">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={updatedProduct.categoryId}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    categoryId: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="productImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="text"
                value={updatedProduct.images}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    images: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllProducts;
