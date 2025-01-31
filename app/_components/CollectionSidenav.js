"use client";
import Link from "next/link";
import { useAuth } from "./_context/auth";
import { useState, useEffect } from "react";
import { fetchCategories } from "../lib/action";

const CollectionSidenav = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
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
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="d-flex flex-column bg-light vh-100 p-3 shadow">
      <h2 className="mb-4">Filters</h2>
      <h4 className="mb-4">Categories</h4>
      {error && <p className="text-danger">{error}</p>}
      <ul className="nav flex-column">
        {categories.map((category, index) => (
          <li
            key={category.id || `${category.slug}-${index}`}
            className="nav-item mb-2"
          >
            <Link
              href={`/collection/${category.slug}`}
              className="nav-link text-dark"
            >
              <i className="bi bi-speedometer2"></i> {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionSidenav;
