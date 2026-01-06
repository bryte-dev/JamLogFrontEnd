import api from "../api/api";

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const register = (email: string, username: string, password: string) =>
  api.post("/auth/register", { email, username, password });
