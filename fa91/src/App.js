import React  from "react";
import NavBar from "./component/NavBar/NavBar";
import { FaBeer, FaBars } from "react-icons/fa";
import ThemeContextProvider from "./Context/ThemeContext";
import "./index.css";



function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <NavBar />
        <span  >lets go a <FaBeer/></span>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
