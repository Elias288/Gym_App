import React, { createContext, useContext } from "react";

import useAuth from "../contexts/useAuth";

/** @type {import('react').Context<import("../contexts/useAuth").useAuthProps>} */
const AuthContext = createContext(undefined);

/** @param {{ children: jsx.element}} [props] */
const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar dentro de un AuthProvider");

  return context;
}

export default AuthProvider;
