import { useState, useEffect } from "react";

const useAuthenticate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (username, password) => {
    if (username === "user" && password === "password") {
      const token = btoa(`${username}:${Date.now()}`); 
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuthenticate;
