"use client";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  //its an global state
  const [auth, setAuth] = useState({
    user: null,
    // token: "",
  });
  // axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        // token: parseData.token,
      });
    }
  }, []);
  return (
    <authContext.Provider value={[auth, setAuth]}>
      {children}
    </authContext.Provider>
  );
};
const useAuth = () => useContext(authContext);
export { useAuth, AuthProvider };
