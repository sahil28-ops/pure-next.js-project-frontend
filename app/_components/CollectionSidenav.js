"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; 
import { fetchCategories } from "../lib/action";

const CollectionSidenav = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category"); 

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      }
    };
    getCategories();
  }, []);

  return (
    <div className="d-flex flex-column bg-light vh-100 p-3 shadow">
      <h2 className="mb-4">Filters</h2>
      <h4 className="mb-4">Categories</h4>
      {error && <p className="text-danger">{error}</p>}
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button
            onClick={() => router.push("/collection")}
            className={`nav-link text-dark ${!selectedCategory ? "fw-bold" : ""}`}
          >
            All Products
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.slug} className="nav-item mb-2">
            <button
              onClick={() => router.push(`/collection?category=${category.slug}`)}
              className={`nav-link text-dark ${selectedCategory === category.slug ? "fw-bold" : ""}`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionSidenav;
