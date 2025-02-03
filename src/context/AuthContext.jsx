/* eslint react/prop-types: 0 */
import { createContext, useState, useEffect } from "react";
import useAuthenticate from "../hooks/useAuthenticate";

export const AuthContext = createContext({
  authState: false,
  login: () => {},
  logout: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
});

const AuthProvider = ({ children }) => {
  const { isAuthenticated, login, logout } = useAuthenticate();
  const [authState, setAuthState] = useState(isAuthenticated);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", newTheme);
  };
  return (
    <AuthContext.Provider
      value={{ authState, login, logout, darkMode, toggleDarkMode }}
    >
      <div className={darkMode ? "dark-mode" : ""}> {children}</div>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
