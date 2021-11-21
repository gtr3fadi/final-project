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
  
  const { toggleTheme, isLightTheme } = useContext(ThemeContext);
  
  const menuBarToggle = () => {
    const menuBar = document.querySelector(".menu-bar");
    menuBar.classList.toggle("open");
  };


  return (
    <div>
      <nav className="navbar">
        <div
          style={{
            width: "260px",
          }}
        ></div>

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
              <NavLink to="/findfreelancer">
                Find a Freelancer
                <FaUsers className="mb-2 fa-icon" />
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="user-tools col col-lg-2">
          {user && (
            
              <Link to={`/profile/${user.uid}`}>
                <div className="user-login">
                  <div className="user-name d-none d-md-flex">
                    {" "}
                    {user.displayName}
                  </div>

                  <Avatar src={user.photoURL} />
                </div>
              </Link>
              
            
          )}
          {!user && (
            <span className="user-tools-text">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </span>
          )}
        </div>

        {user && (
          <div className="theme-toggle col">
            <button onClick={toggleTheme}>
              {isLightTheme ? (
                <span className="theme-toggle-text">
                  <FaMoon color="black" /> 
                </span>
              ) : (
                <span className="theme-toggle-text">
                  <FaSun color="yellow " /> 
                </span>
              )}
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
