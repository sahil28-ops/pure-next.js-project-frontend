"use server";
import axios from "axios";
export const LoginHandler = async (formData) => {
  const { email, password } = formData;
  //   await console.log(email, password);
  try {
    const response = await axios.post(`http://localhost:3001/login`, {
      email,
      password,
    });
    // console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

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
    console.log(error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3001/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// create category

export const handleCreateCategory = async () => {
  try {
    const response = await axios.post(`http://localhost:3001/category`, {
      category,
    });
    return response.data;
  } catch (error) {
    console.log("failed to create category");
  }
};

//delete category
export const handleDeleteCategory = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.log("failed to delete category");
  }
};
