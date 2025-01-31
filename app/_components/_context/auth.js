"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Global state for authentication
  const [auth, setAuth] = useState({
    user: null,
    // Uncomment this if you're handling tokens
    // token: "",
  });

  // Update localStorage whenever auth state changes
  useEffect(() => {
    if (auth?.user) {
      localStorage.setItem("auth", JSON.stringify(auth)); // Store auth data in localStorage
    }
  }, [auth]); // Runs whenever auth changes

  useEffect(() => {
    // Retrieve auth data from localStorage on initial load
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedData.user,
        // Uncomment this line if you're handling tokens
        // token: parsedData.token,
      });
    }
  }, []); // Runs only once when the component mounts

  // Function to clear auth data
  const clearAuth = () => {
    setAuth({
      user: null,
      // Uncomment this if you're handling tokens
      // token: "",
    });
    localStorage.removeItem("auth"); // Clear auth data from localStorage
  };

  return (
    <AuthContext.Provider value={[auth, setAuth, clearAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
