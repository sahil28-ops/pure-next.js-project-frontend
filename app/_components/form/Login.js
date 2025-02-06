"use client";
 
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/auth";
import { LoginHandler } from "../../lib/action";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [auth, setAuth] = useAuth(); // Access auth context
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    try {
      const data = { email, password };
      const result = await LoginHandler(data);
      console.log(result);

      if (result.success) {
        console.log("Login successful");
        setAuth(result); // Update auth context (this triggers the useEffect in AuthProvider to sync with localStorage)
        router.push("/"); // Redirect to the home page
      } else {
        console.log(result.message || "Invalid credentials");
      }
      setLogin({ email: "", password: "" });
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h1 className="h4">Welcome Back</h1>
          <p className="text-muted">Log in to your account</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <p className="mt-3 text-center">
            If you don't have an account, go to{" "}
            <Link href="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
