import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
import MyProject from "./component/MyProject";
import LogIn from "./component/LogIn";
import SignUp from "./component/SignUp";
import { useAuthContext } from "./component/hook/useAuthContext";


function App() {
  const { AuthIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {AuthIsReady && (
        <ThemeContextProvider>
          <BrowserRouter>
            <NavBar />
            <Home />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/project" component={Project} />
              <Route exact path="/project/:id">
                {user ? <SingleProject /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/project/edit/:id" component={UpdateProject} />
              <Route exact path="/postproject" >
                {user ? <PostProject /> : <Redirect to="/login" />}
                </Route>
              <Route exact path="/myproject">
                {user ? <MyProject /> : <Redirect to="/login" />}
                </Route>
              <Route path="/login">
                {user ? <Redirect to="/" /> : <LogIn />}
              </Route>
              <Route path="/signup">
                {user ? <Redirect to="/" /> : <SignUp />}
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
            
          </BrowserRouter>
        </ThemeContextProvider>
      )}
    </div>
  );
}

export default App;
