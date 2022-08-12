import type { AuthUser } from "types";
import type { AuthContextProps, AuthContextInterface } from "./types";

import React, { createContext, useState, useContext } from "react";
const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }: AuthContextProps) => {
  const [authUser, setAuthUser] = useState<AuthUser>({
    document: null,
    id: null,
    accountNumber: null,
    isAuthenticated: false,
    name: null,
  });

  const login = (user: AuthUser): void => {
    setAuthUser({ ...user, isAuthenticated: true });
  };

  const logout = (): void => {
    setAuthUser({
      document: null,
      id: null,
      accountNumber: null,
      isAuthenticated: false,
      name: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthUser must be inside a Auth Provider with a value");
  }

  return useContext(AuthContext);
};

export default AuthContext;
