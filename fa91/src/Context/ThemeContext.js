import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState("Fadi Ayoub");

  const tran = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 1000);
  };

  const toggleTheme = () => {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      tran();
      document.documentElement.setAttribute("data-theme", "dark");
      setIsLightTheme(false);
    } else {
      tran();
      document.documentElement.setAttribute("data-theme", "light");
      setIsLightTheme(true);
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isLightTheme, isLogin, user }}>
      {props.children}
    </ThemeContext.Provider>
  );
};



export default ThemeContextProvider;




