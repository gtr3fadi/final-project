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
import { useLogout } from "../hook/useLogout"
import { useAuthContext } from "../hook/useAuthContext";
import Avatar from "../Avatar";

const NavBar = () => {
  const {user}=useAuthContext()
  const { logout, isPending , error  } = useLogout()
  
  const { toggleTheme, isLightTheme} = useContext(ThemeContext);

  return (
    <div>
      <nav className="navbar">
        <div className="bars-toggle col">
          <FaBars className="bars" />
        </div>
        <NavLink exact className="brand col brand"
          to="/">
          Div.Space
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

            {user && (
              <li>
                <Link to="/myproject">
                  my project
                  <BsFileEarmarkPerson className="mb-2 fa-icon" />
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="user-tools col col-lg-2">
          {user && (
            <div className="user-login">
              <div className="user-name">Hello , {user.displayName}</div>
              
                <Avatar src={user.photoURL} />
              
              <div className="user-dropdown">
                <BsThreeDotsVertical size="25px" className="threeDots" />
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link to="/profile">viwe profile</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="#">Setting</Link>
                  </li>
                  <li className="dropdown-item">
                    {!isPending && (
                      <button
                        className="btn btn-outline-danger"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    )}
                    {isPending && <div>Logging out...</div>}
                    {error && <div>{error}</div>}
                  </li>
                </ul>
              </div>
            </div>
          )}
          {!user && (
            <span className="user-tools-text">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
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
