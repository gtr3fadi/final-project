import React, { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const NavBar = () => {
  const {  toggleTheme } = useContext(ThemeContext);

 

  return (
    <>
      <nav >
        <div className="container">

        </div>
        
      </nav>
      <div>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className="mean">
        <div className="mean-card">
          <div className="mean-card-header">
            <div className="mean-card-header-title">
              <h3>fadi ayoub</h3>
            </div>
            <p>
              lourem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            </div>

        </div>
        
       </div>

    </>
  );
};

export default NavBar;
