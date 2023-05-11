import { useContext } from "react";
import { ThemeContext } from "../components/context/ThemeProvider";
import { NotificationContext } from "../components/context/NotificationProvider";
import { AuthContext } from "../components/context/AuthProvider";

export const useTheme = () => {
  return useContext(ThemeContext);
};
export const useNotification = () => {
  return useContext(NotificationContext);
};
export const useAuth = () => {
  return useContext(AuthContext);
};
