import React , { useContext,useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext";



const  NavBar=() =>{
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const Theme = theme.isLightTheme ? theme.light : theme.dark;
  
  console.log(Theme);

    return (
      <>
        <div
          style={{ background: Theme.ui, color: Theme.syntax }}
            >
                fadi ayoub
        </div>
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
      </>
    );
}

export default NavBar;
