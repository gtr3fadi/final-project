import React, { useContext, useState } from "react";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";
import { BsThreeDotsVertical, BsFileEarmarkPerson } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { ThemeContext } from "../../Context/ThemeContext";
import "./NavBar.css";
import userAvatar from "../image/user.jpg";

const NavBar = () => {
  const { toggleTheme, isLightTheme, isLogin ,user} = useContext(ThemeContext);

  return (
    <div>
      <nav className="navbar">
        <div className="bars-toggle col">
          <FaBars className="bars" />
        </div>
        <div className="brand col  " to="#">
          FrLncr.ME
        </div>

        <div className=" col-lg-7 ">
          <ul className="nav-links d-none d-lg-flex ">
            <li>
              <a href="#">
                Post a project
                <AiOutlineAppstoreAdd className="mb-2 fa-icon" />
              </a>
            </li>
            <li>
              <a href="#">
                Project
                <FaProjectDiagram className="mb-2 fa-icon" />
              </a>
            </li>

            <li>
              <a href="#">
                Find a Freelancer
                <FaUsers className="mb-2 fa-icon" />
              </a>
            </li>

            {isLogin && (
              <li>
                <a href="#">
                  my project
                  <BsFileEarmarkPerson className="mb-2 fa-icon" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="user-tools col col-lg-2">
          {isLogin && (
            <div className="user-login">
              <div className="user-name">{user}</div>
              <div className="user-avatar">
                <img src={userAvatar} alt="avatar" />
              </div>
              <div className="user-dropdown">
                <BsThreeDotsVertical size="25px" className="threeDots" />
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <a href="#">viwe profile</a>
                  </li>
                  <li className="dropdown-item">
                    <a href="#">Setting</a>
                  </li>
                  <li className="dropdown-item">
                    <a href="#">
                      Logout
                    </a>
                  </li>
                </ul>
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

        <div className="theme-toggle col">
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
    </div>
  );
};

export default NavBar;
