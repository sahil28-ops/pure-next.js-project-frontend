"use client";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { fetchCategories, handleCreateProduct } from "../../lib/action";

const CreateProduct = () => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const apiUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
  const backendUrl = "http://localhost:3001/product";

  const [categories, setCategories] = useState([]); // Store categories
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  }); // Store product data
  const [error, setError] = useState(""); // Store error message
  const [files, setFiles] = useState([]); // Store files

  // Fetch categories when component mounts
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.log("Error fetching categories:", error);
        setError("Failed to load categories.");
      }
    };
    getCategories();
  }, []);

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

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Remove file from list
  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted!"); // Debugging Step
    if (!files.length) return alert("Please select at least one image!");

    const imageUrls = [];
    try {
      // Upload files to Cloudinary
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPreset);

        const response = await fetch(apiUrl, { method: "POST", body: data });
        const result = await response.json();
        if (result.secure_url) imageUrls.push(result.secure_url);
      }

      console.log("Uploaded Images:", imageUrls); // Debugging Step

      const productData = { ...product, images: imageUrls };
      const createProduct = await handleCreateProduct(productData);

      console.log("API Response:", createProduct); // Debugging Step

      if (createProduct.success) {
        alert(createProduct.message);
        setProduct({ name: "", description: "", price: "", categoryId: "" });
        setFiles([]); // Reset files
      } else {
        alert(createProduct.message);
      }
    } catch (error) {
      console.log("Error submitting product:", error);
    }
  };

  return (
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

      <Form.Label className="mt-2">Upload Images</Form.Label>
      <div>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mt-1"
        />
      </div>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
            <button
              type="button"
              onClick={() => removeFile(index)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <Button variant="primary" type="submit" className="mt-4">
        Add Product
      </Button>
    </Form>
  );
};

export default CreateProduct;
