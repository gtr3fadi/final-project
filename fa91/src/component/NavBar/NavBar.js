import React , { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";



const  NavBar=() =>{
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    return (
      <>
        <div
          className="navbar"
          style={{
            color: theme.syntax,
            background: theme.bg,
            height: "300px",
            width: "300px"
          }}
        ></div>
      </>
    );
}

export default NavBar;
