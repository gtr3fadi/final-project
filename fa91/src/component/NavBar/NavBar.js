import React , { useContext,useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext";



const  NavBar=() =>{
  const { theme } = useContext(ThemeContext);
  const Theme = theme.isLightTheme ? theme.light : theme.dark;
  
  console.log(Theme);

    return (
      <>
        <div
          style={{ background: Theme.ui, color: Theme.syntax }}
            >
                fadi ayoub
        </div>
      </>
    );
}

export default NavBar;
