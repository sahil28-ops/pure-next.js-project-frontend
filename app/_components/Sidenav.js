"use client";
import Link from "next/link";
import { useAuth } from "./_context/auth";

const Sidenav = () => {
  const [auth] = useAuth();

  return (
    <div className="d-flex flex-column bg-light vh-100 p-3 shadow">
      <h4 className="mb-4">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link href="../dashboard/profile" className="nav-link text-dark">
            <i className="bi bi-speedometer2"></i> overview
          </Link>
        </li>
        {auth?.user?.role === 1 ? (
          <>
            <li className="nav-item mb-2">
              <Link href="../dashboard/profile" className="nav-link text-dark">
                <i className="bi bi-person"></i> Profile
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                href="../dashboard/createCategeory"
                className="nav-link text-dark"
              >
                <i className="bi bi-folder-plus"></i> Create Category
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                href="../dashboard/createProduct"
                className="nav-link text-dark"
              >
                <i className="bi bi-plus-square"></i> Create Product
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                href="../dashboard/allProducts"
                className="nav-link text-dark"
              >
                <i className="bi bi-box"></i> All Products
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item mb-2">
            <Link href="../dashboard/profile" className="nav-link text-dark">
              <i className="bi bi-person"></i> Profile
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidenav;
