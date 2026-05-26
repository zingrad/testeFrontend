import { useMemo, useState, type ReactNode } from "react";

import { AuthContext } from "./AuthContext";

const AUTH_STORAGE_KEY = "encontact-auth";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  function login(username: string, password: string) {
    const isValidLogin = username === "Admin" && password === "Admin";

    if (!isValidLogin) {
      return false;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsAuthenticated(true);

    return true;
  }

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
