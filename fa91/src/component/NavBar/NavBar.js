import React, { useContext, useState } from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ThemeContext } from "../../Context/ThemeContext";
import "./NavBar.css";
import userAvatar from "../image/user.jpg";

const NavBar = () => {
  const { toggleTheme, isLightTheme, isLogin ,user} = useContext(ThemeContext);

  return (
    <div>
      <nav className="navbar row">
        <div className="bars-toggle col-2">
          <FaBars className="bars" />
        </div>

        <div className="container col">
          <a className="brand " to="#">
            FA91
          </a>
          <ul className="nav-links d-none d-lg-flex ">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>

          <div className="user-tools">
            {isLogin && (
              <div className="user-login">
                <div className="user-name">{user}</div>
                <div className="user-avatar">
                  <img src={userAvatar} alt="avatar" />
                </div>
                <div className="user-dropdown">
                  <BsThreeDotsVertical  size="25px" className="threeDots" />
                  </div>
              </div>
            )}
            {!isLogin && (
              <span className="user-tools-text">
                <a href="#">Login</a>
                <a href="#">Sign Up</a>
              </span>
            )}
          </div>
        </div>

        <div className="theme-toggle col-2">
          <button onClick={toggleTheme}>
            {isLightTheme ? (
              <span className="theme-toggle-text">
                <FaMoon color="black" /> Dark
              </span>
            ) : (
              <span className="theme-toggle-text">
                <FaSun color="yellow " /> Light
              </span>
            )}
          </button>
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
              <i className="fa fa-user-circle-o"></i>
            </div>
            <p>lourem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>




      </div>
    
  );
};

export default NavBar;
