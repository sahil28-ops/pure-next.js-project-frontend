"use client";
import {
  fetchCategories,
  handleDeleteProduct,
  handleFetchProduct,
  handleUpdateProduct,
} from "../../lib/action";
import { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";

const AllProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // Fetch products and categories if not already loaded
  const initializeData = async () => {
    if (products.length === 0) {
      try {
        const data = await handleFetchProduct();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      }
    }

    if (categories.length === 0) {
      try {
        const data = await fetchCategories();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      }
    }
  };

  // Call initializeData conditionally
  if (products.length === 0 || categories.length === 0) {
    initializeData();
  }

  // Delete product
  const handleDeleteProductClick = async (productId) => {
    try {
      const deleteproduct = await handleDeleteProduct(productId);
      if (deleteproduct.success) {
        setProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
      } else {
        setError("Error while deleting product.");
      }
    } catch (err) {
      setError("Error while deleting product.");
    }
  };

  // Edit product
  const handleEditProductClick = (product) => {
    setEditProduct(product);
    setUpdatedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
    });
    setShowModal(true);
  };

  // Update product
  const handleUpdateProductClick = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    try {
      const updateProduct = await handleUpdateProduct(
        editProduct._id,
        updatedProduct
      );
      if (updateProduct.success) {
        setEditProduct(null);
        setUpdatedProduct({
          name: "",
          description: "",
          price: "",
          categoryId: "",
        });
        setShowModal(false);
        setProducts((prev) =>
          prev.map((product) =>
            product._id === editProduct._id
              ? { ...product, ...updatedProduct }
              : product
          )
        );
      } else {
        setError(updateProduct.message || "Failed to update product.");
      }
    } catch (err) {
      console.error("Error while updating product:", err);
      setError("Error while updating product.");
    }
  };

  return (
    <div>
      <h2 className="mt-4">All products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((curEle, index) => (
            <tr key={curEle._id || index}>
              <td>{index + 1}</td>
              <td>{curEle.name}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditProductClick(curEle)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProductClick(curEle._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Editing Product */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProductClick}>
            <Form.Group className="mb-3" controlId="editProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new product name"
                value={updatedProduct.name || ""}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new product description"
                value={updatedProduct.description || ""}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter new product price"
                value={updatedProduct.price || ""}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductCategoryId">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={updatedProduct.categoryId || ""}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }))
                }
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllProduct;
