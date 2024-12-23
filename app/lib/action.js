"use server";
import axios from "axios";

// Login Handler
export const LoginHandler = async (formData) => {
  const { email, password } = formData;
  try {
    const response = await axios.post(`http://localhost:3001/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// SignUp Handler
export const SignUpHandler = async (formData) => {
  const { name, email, password, mobile, address } = formData;
  try {
    const response = await axios.post(`http://localhost:3001/register`, {
      name,
      email,
      password,
      mobile,
      address,
    });
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

// Fetch Categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3001/categories");
    return response.data;
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
};

// Create Category
export const handleCreateCategory = async (category) => {
  if (!category) {
    console.log("Category name is required.");
  }
  try {
    const response = await axios.post(`http://localhost:3001/category`, {
      category,
    });
    return response.data;
  } catch (error) {
    console.log("Error creating category:", error);
  }
};

// Delete Category
export const handleDeleteCategory = async (categoryId) => {
  if (!categoryId) {
    console.log("Category ID is required.");
  }
  try {
    const response = await axios.delete(
      `http://localhost:3001/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error deleting category:", error);
  }
};

////update category
export const handleUpdateCategory = async (categoryId, updatedName) => {
  if (!categoryId || !updatedName) {
    return { success: false, message: "Category ID and name are required." };
  }

  try {
    const response = await axios.put(
      `http://localhost:3001/category/${categoryId}`,
      {
        name: updatedName,
      }
    );
    return response.data; // Return success or error message
  } catch (error) {
    console.log("Error updating category:", error);
    return { success: false, message: "Failed to update category" };
  }
};
