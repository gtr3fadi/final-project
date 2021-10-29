import React, { useContext, useState } from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../Context/ThemeContext";
import "./NavBar.css";

const NavBar = () => {
  const { toggleTheme, isLightTheme, isLogin } = useContext(ThemeContext);

  return (
    <>
      <nav className="navbar ">
        <div className="bars-toggle">
          <FaBars className="bars" />
        </div>
        <a className="brand" to="#">
          FA91
        </a>
        <ul className="nav-links">
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
            <span className="user-tools-text">
              <a href="#"> Welcome, fadi ayoub</a>
              <a href="#">Logout</a>
            </span>
          )}
          {!isLogin && (
            <span className="user-tools-text">
              <a href="#">Login</a>
              <a href="#">Sign Up</a>
            </span>
          )}
        </div>

        <div className="theme-toggle">
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
    </>
  );
};

export default NavBar;
