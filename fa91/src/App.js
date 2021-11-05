import React from "react";
import {BrowserRouter, BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import NavBar from "./component/NavBar/NavBar";
import { FaBeer, FaBars } from "react-icons/fa";

import ThemeContextProvider from "./Context/ThemeContext";
import "./index.css";
import Home from "./component/Home";
import Project from "./component/project/Project";
import SingleProject from "./component/SingleProject";
import UpdateProject from "./component/UpdateProject";
import PostProject from "./component/PostProject/PostProject";
import LogIn from "./component/LogIn";
import SignUp from "./component/SignUp";



function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <BrowserRouter>
          <NavBar />
          <Home />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/project" component={Project} />
            <Route exact path="/project/:id" component={SingleProject} />
            <Route exact path="/project/edit/:id" component={UpdateProject} />
            <Route exact path="/postproject" component={PostProject} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
