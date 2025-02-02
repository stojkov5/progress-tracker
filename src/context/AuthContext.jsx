/* eslint react/prop-types: 0 */
import { createContext, useState, useEffect } from "react";
import useAuthenticate from "../hooks/useAuthenticate";

export const AuthContext = createContext({
  authState: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const { isAuthenticated, login, logout } = useAuthenticate();
  const [authState, setAuthState] = useState(isAuthenticated);

  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
