
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider"; // Adjust path if needed

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};
