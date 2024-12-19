"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginHandler } from "../../lib/action";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const router = useRouter();

  //   const handleLoginUpData = async (e) => {
  //     e.preventDefault();
  //     const { email, password } = login;
  //     try {
  //       const response = await axios.post(`http://localhost:3001/login`, {
  //         email,
  //         password,
  //       });
  //       if (response.data.success) {
  //         console.log(response.data.message);
  //         router.push("/");
  //         localStorage.setItem("auth", JSON.stringify(response.data));
  //       } else if (response.data.message) {
  //         console.log(response.data.message);
  //       }
  //     } catch (error) {
  //       console.error("Login failed", error);
  //     }
  //     setLogin({ email: "", password: "" });
  //   };

  const submitHandler = async (e) => {
    const { email, password } = login;
    try {
      const data = { email, password };
      const result = await LoginHandler(data);
      // console.log(result)
      if (result.sucess) {
        console.log("login sucessful");
        router.push("/");
      } else {
        console.log(result.message || "Invalid credentials");
      }
      setLogin({ email: "", password: "" });
    } catch (error) {
      console.error("Error during login:", error);
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
        <form action={submitHandler}>
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
