import React, { createContext, useContext } from "react";

import useAuth from "../contexts/useAuth";

const AuthContext = createContext(useAuth());

export function authContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar dentro de un AuthProvider");

  return context;
}

/**
 * @param {Object} props
 * @param {any} props.children
 */
const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
