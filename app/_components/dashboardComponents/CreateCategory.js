"use client";
import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import {
  fetchCategories,
  handleCreateCategory,
  handleDeleteCategory,
} from "@/app/lib/action";

const CreateCategory =  () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, [count]);

  const handleCategoryData = async (e) => {
    e.preventDefault();

    // Add the category
    try {
      const createCategory = await handleCreateCategory(category);
      if (createCategory.success) {
        console.log(createCategory.message);
        setCount((prevCount) => prevCount + 1);
      } else {
        console.error(createCategory.message);
      }

      setCategory("");
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  // Delete a category
  const handleDeleteCategoryClick = async (categoryId) => {
    try {
      const deleteCategory = await handleDeleteCategory(categoryId);

      if (deleteCategory.success) {
        console.log(deleteCategory.message);
        setCount((prevCount) => prevCount + 1);
      } else {
        console.error(deleteCategory.message);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Category
          </Button>
        </Form>
      </div>

      <h2 className="mt-4">Categories</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((curEle, index) => (
            <tr key={curEle._id || index}>
              <td>{index + 1}</td>
              <td>{curEle.name}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteCategoryClick(curEle._id)}
                  className="me-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CreateCategory;
