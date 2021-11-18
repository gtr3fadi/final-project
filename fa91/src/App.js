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
import Profile from "./component/Profile/Profile";
import SideBar from "./component/SideBar/SideBar";
import FindFreelancer from "./component/FindFreelancer/FindFreelancer";
import FollowerList from "./component/Follow/FollowerList";

function App() {
  const { AuthIsReady, user } = useAuthContext();
  return (
    <div className="App" style={{
      position: "relative",
    }}>
      {AuthIsReady && (
        <ThemeContextProvider>
          <BrowserRouter>
            <NavBar />
            <SideBar />

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/project" component={Project} />
              <Route exact path="/project/:id">
                {user ? <SingleProject /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/project/edit/:id" component={UpdateProject} />
              <Route exact path="/postproject">
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
              <Route exact path="/profile/:id">
                {user ? <Profile /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/findfreelancer">
                {user ? <FindFreelancer /> : <Redirect to="/login" />}
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
            <FollowerList/>
          </BrowserRouter>
        </ThemeContextProvider>
      )}
    </div>
  );
}

export default App;
