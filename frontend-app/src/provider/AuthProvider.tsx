import { ReactNode, createContext, useContext } from "react";

import useAuth, { authProps } from "../contexts/useAuth";

const AuthContext = createContext<authProps | undefined>(undefined);

export function authContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar dentro de un AuthProvider");

  return context;
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
