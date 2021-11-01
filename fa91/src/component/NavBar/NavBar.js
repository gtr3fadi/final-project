import React, { useContext, useState } from "react";
import { Link ,NavLink} from "react-router-dom";
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
        <NavLink exact className="brand col  " to="/">
          FrLncr.ME
        </NavLink>

        <div className=" col-lg-7 ">
          <ul className="nav-links d-none d-lg-flex ">
            <li>
              <NavLink to="/postproject">
                Post a project
                <AiOutlineAppstoreAdd className="mb-2 fa-icon" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/project">
                Project
                <FaProjectDiagram className="mb-2 fa-icon" />
              </NavLink>
            </li>

            <li>
              <NavLink to="#">
                Find a Freelancer
                <FaUsers className="mb-2 fa-icon" />
              </NavLink>
            </li>

            {isLogin && (
              <li>
                <Link to="#">
                  my project
                  <BsFileEarmarkPerson className="mb-2 fa-icon" />
                </Link>
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
                    <Link to="#">viwe profile</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="#">Setting</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="#">Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {!isLogin && (
            <span className="user-tools-text">
              <Link to="#">Login</Link>
              <Link to="#">Sign Up</Link>
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
