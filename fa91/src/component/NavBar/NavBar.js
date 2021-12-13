import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaUsers, FaProjectDiagram } from "react-icons/fa";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { ThemeContext } from "../../Context/ThemeContext";
import "./NavBar.css";
import { useAuthContext } from "../hook/useAuthContext";
import Avatar from "../Avatar";
import { motion } from "framer-motion";

const NavBar = () => {
  const { user } = useAuthContext();

  const { toggleTheme, isLightTheme } = useContext(ThemeContext);

  return (
    <div>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 2 }}
        className="navbar"
      >
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

                <Avatar uid={user.uid} />
              </div>
            </Link>
          )}
          {!user && (
            <span className="user-tools-text">
              <Link to="/login">Login</Link>/<Link to="/signup">Register</Link>
            </span>
          )}
        </div>

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
      </motion.nav>
    </div>
  );
};

export default NavBar;
