"use server";
import axios from "axios";
// ------------------------- Authentication User start -------------------------
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
    console.log("Error during login:", error);
  }
};

// SignUp Handler
export const SignUpHandler = async (formData) => {
  const { name, email, password, mobile, address } = formData;
  try {
    const response = await axios.post(`http://localhost:3001/signup`, {
      name,
      email,
      password,
      mobile,
      address,
    });
    return response.data;
  } catch (error) {
    console.log("Error during signup:", error);
  }
};

// update User Details
export const handleUpdateUserDetails = async (email, profile) => {
  if (!email || !profile) {
    return { success: false, message: "fields are required." };
  }
  try {
    const response = await axios.put(`http://localhost:3001/profile`, {
      name: profile.name,
      email: profile.email,
      password: profile.password,
      mobile: profile.mobile,
      address: profile.address,
      role: profile.role,
    });
    return response.data;
  } catch (error) {
    console.log("Error updating user details:", error);
    return { success: false, message: "Failed to update user details" };
  }
};

// ------------------------- Authentication User end -------------------------

// ------------------------- Category start ----------------------------------

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

// Update Category
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
    return response.data;
  } catch (error) {
    console.log("Error updating category:", error);
    return { success: false, message: "Failed to update category" };
  }
};

// ------------------------- Category end ---------------------------------------

// ------------------------- Product start ---------------------------------------

// create Product

// create Product

export const handleCreateProduct = async (product) => {
  try {
    console.log("Sending Product Data:", product);

    const { name, description, price, categoryId, images } = product;
    const response = await axios.post("http://localhost:3001/product", {
      name,
      description,
      price,
      categoryId,
      images,
    });

    console.log("Product Created Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error while creating product:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message:
        error.response?.data?.error ||
        "Unable to create product. Check your network connection.",
    };
  }
};

// fetch product
export const handleFetchProduct = async () => {
  try {
    const response = await fetch(`http://localhost:3001/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log("🔍 API Response:", data); // Debugging Log
    return data;
  } catch (error) {
    console.error("🚨 Error fetching products:", error);
    return [];
  }
};




// delete product

export const handleDeleteProduct = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/product/${id}`);
    return response.data; // Corrected: No parentheses needed
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product." };
  }
};

// update product

export const handleUpdateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`http://localhost:3001/product/${id}`, {
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      categoryId: updatedProduct.categoryId,
      images: updatedProduct.images, // Add images if updating them
    });

    return response.data; // Corrected: No need for parentheses
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product." };
  }
};

// ------------------------- Product end -----------------------------------------
