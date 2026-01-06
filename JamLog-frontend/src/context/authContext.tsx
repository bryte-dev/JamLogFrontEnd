import { createContext, useContext, useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "../services/tokenService";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken().then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  const login = async (newToken: string) => {
    await saveToken(newToken);
    setToken(newToken);
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
