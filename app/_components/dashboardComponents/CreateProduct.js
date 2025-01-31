"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { fetchCategories, handleCreateProduct } from "../../lib/action";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]); // fetch categories from the server and store them in state
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  }); // store the product data in state
  const [error, setError] = useState(""); // store error message in state

  // Fetch categories from the server
  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data.categories || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
      setError("Failed to load categories.");
    }
  };

  if (categories.length === 0 && !error) {
    getCategories();
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Handle category selection changes
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: selectedCategoryId,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // submit the product data to the server
    try {
      const createProduct = await handleCreateProduct(product);
      if (createProduct.success) {
        console.log(createProduct.message);
        setProduct({ name: "", description: "", price: "", categoryId: "" });
      } else if (createProduct.message) {
        console.log(createProduct.message);
      }
    } catch (error) {
      console.log("Error submitting product:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          required
        />

        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter product description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          required
        />

        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          required
        />

        <Form.Label>Select Category</Form.Label>
        <Form.Select
          aria-label="Select category"
          value={product.categoryId}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Open this select menu</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </Form.Select>

        <Button variant="primary" type="submit" className="mt-4">
          Add Product
        </Button>
      </Form>
    </>
  );
};

export default CreateProduct;
