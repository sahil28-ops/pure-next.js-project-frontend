"use client";
import { useState } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";
import { fetchCategories, handleCreateCategory, handleDeleteCategory, handleUpdateCategory } from "../../lib/action";

const CreateCategory = () => {
  const [category, setCategory] = useState(""); // for tracking category input field
  const [categories, setCategories] = useState([]); // for storing fetched categories
  const [editingCategory, setEditingCategory] = useState(null); // For tracking category being edited
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility
  const [updatedCategoryName, setUpdatedCategoryName] = useState(""); // For tracking updated category name
  const [error, setError] = useState("");

  // Fetch categories
  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories.");
    }
  };

  // Initial fetch
  if (categories.length === 0 && !error) {
    getCategories();
  }

  // Handle adding a category
  const handleCategoryData = async (e) => {
    e.preventDefault();
    try {
      const createCategory = await handleCreateCategory(category);
      if (createCategory.success) {
        setCategory("");
        getCategories(); // Refresh categories
      } else {
        console.error(createCategory.message);
        setError("Failed to create category.");
      }
    } catch (error) {
      console.error("Failed to add category:", error);
      setError("Error while adding category.");
    }
  };

  // Handle deleting a category
  const handleDeleteCategoryClick = async (categoryId) => {
    try {
      const deleteCategory = await handleDeleteCategory(categoryId);
      if (deleteCategory.success) {
        getCategories(); // Refresh after deletion
      } else {
        setError("Failed to delete category.");
      }
    } catch (error) {
      setError("Error while deleting category.");
    }
  };

  // Handle editing a category
  const handleEditCategoryClick = (category) => {
    setEditingCategory(category); // Set the category to be edited
    setUpdatedCategoryName(category.name); // Pre-fill the updated name in the modal
    setShowModal(true); // Show the modal
  };

  // Handle updating a category
  const handleUpdateCategoryClick = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      const updateCategory = await handleUpdateCategory(
        editingCategory._id,
        updatedCategoryName
      );
      if (updateCategory.success) {
        setUpdatedCategoryName(""); // Reset input field for modal
        setEditingCategory(null); // Clear editing state
        setShowModal(false); // Close modal
        getCategories(); // Refresh categories
      } else {
        setError(updateCategory.message || "Failed to update category.");
      }
    } catch (error) {
      console.log("Error while updating category.", error);
      setError("Error while updating category.");
    }
  };

  return (
    <>
      <div>
        <h1>Add Category</h1>
        <Form onSubmit={handleCategoryData}>
          <Form.Group className="mb-3" controlId="categoryInput">
            <Form.Control
              type="text"
              placeholder="Enter category name"
              className="w-50"
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Category
          </Button>
        </Form>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <h2 className="mt-4">Categories</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((curEle, index) => (
            <tr key={curEle._id || index}>
              <td>{index + 1}</td>
              <td>{curEle.name}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditCategoryClick(curEle)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteCategoryClick(curEle._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Editing Category */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateCategoryClick}>
            <Form.Group className="mb-3" controlId="editCategoryInput">
              <Form.Control
                type="text"
                placeholder="Enter new category name"
                value={updatedCategoryName || ""}
                onChange={(e) => setUpdatedCategoryName(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Category
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
    </>
  );
};

export default CreateCategory;