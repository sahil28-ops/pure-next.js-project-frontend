import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { fetchCategories, handleCreateCategory } from "@/app/lib/action";
const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, [count]);

  const handleCategoryData = async (e) => {
    e.preventDefault();

    // to add the category
    try {
      const createCategory = await handleCreateCategory(data);
      if (createCategory.data.success) {
        console.log(response.data.message);
        setCount(count + 1);
      } else {
        console.log(createCategory.data.message);
      }

      setCategory("");
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  ////to delete data

  const handleDeleteCategory = async (categoryId) => {
    try {
      const deleteCtaegory = await handleDeleteCategory(data);

      if (deleteCtaegory.data.message) {
        console.log(response.data.message);
        setCount(count + 1);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };
  // const handleUpdateCategory = async (categoryId) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3001/category/${categoryId}`
  //     );
  //     if (response.data.message) {
  //       console.log(response.data.message);
  //       setCount(count + 1);
  //     } else {
  //       console.log(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to Delete category:".error);
  //   }
  // };
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
                  onClick={() => {
                    handleDeleteCategory(curEle._id);
                    // console.log("Delete action for:", curEle.id);
                  }}
                  className="me-2"
                >
                  Delete
                </Button>
                {/* <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleUpdateCategory(curEle._id);
                  }}
                >
                  Edit
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CreateCategory;
