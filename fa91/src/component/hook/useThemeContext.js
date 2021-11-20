import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within an AuthProvider");
  }
  return context;
};
