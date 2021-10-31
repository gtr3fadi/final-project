import React from "react";
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import NavBar from "./component/NavBar/NavBar";
import { FaBeer, FaBars } from "react-icons/fa";
import ThemeContextProvider from "./Context/ThemeContext";
import "./index.css";
import Home from "./component/Home";



function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <BrowserRouter>
          <NavBar />
          <Home />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
