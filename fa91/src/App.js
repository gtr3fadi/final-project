import React  from "react";
import NavBar from "./component/NavBar/NavBar";
import ThemeContextProvider from "./Context/ThemeContext";



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
