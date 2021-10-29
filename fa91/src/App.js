import React  from "react";
import NavBar from "./component/NavBar/NavBar";
import ThemeContextProvider from "./Context/ThemeContext";
import "./index.css";



function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <NavBar />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
