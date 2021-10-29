import React , { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  

  const tran = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition')
    }, 1000)
  };
  

  
  const toggleTheme = () => {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      tran();
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      tran();
      document.documentElement.setAttribute("data-theme", "light");
    }
  };



  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {props.children}
      </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
