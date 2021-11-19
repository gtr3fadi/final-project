import { Link } from "react-router-dom";
import "./SideBar.css";
import { useAuthContext } from ".././hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useLogout } from "../hook/useLogout";


export default function SideBar() {
  const { user } = useAuthContext();
  const {logout} = useLogout();
  const { documents, error } = useCollection("users");
  if (!documents) return <p className="spinner">Loading...</p>;

  const doc = user ? documents.find(doc => doc.id === user.uid) : null;

  const DivSpace = `<DivSpace/>`;

  

  
  

  

  return (
    <>
      <div className="sidebar hideNav">
        <div className="logo-details">
          <i
            className="fa fa-bars text-light"
            onDoubleClick={() => {
              document.querySelector(".sidebar").classList.toggle("closeNav");
            }}
            onClick={() => {
              if (
                document
                  .querySelector(".sidebar")
                  .classList.contains("closeNav")
              ) {
                document
                  .querySelector(".sidebar")
                  .setAttribute("class", "sidebar hideNav");
              } else {
                document
                  .querySelector(".sidebar")
                  .setAttribute("class", "sidebar closeNav");
              }
            }}
          ></i>
          <span className="logo_name fst-italic ">
            <Link to="/">{DivSpace}</Link>
          </span>
        </div>
        <hr
          className="m-0 "
          style={{
            border: "1px solid #fff",
            width: "100%",
          }}
        />
        <ul className="nav-links">
          {user && (
            <li>
              <Link to="/myproject">
                <i className="fa fa-home"></i>
                <span className="link_name">My Projects</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="/myproject">
                    My Projects
                  </Link>
                </li>
              </ul>
            </li>
          )}
          <li>
            <div className="iocn-link">
              <Link to="/project">
                <i class="fas fa-project-diagram    "></i>
                <span className="link_name">Projects</span>
              </Link>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/project">
                  Projects
                </Link>
              </li>
              {/* <li>
                <Link to="#">HTML & CSS</Link>
              </li>
              <li>
                <Link to="#">JavaScript</Link>
              </li>
              <li>
                <Link to="#">PHP & MySQL</Link>
              </li> */}
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="/postproject">
                <i className="fas fa-sticky-note    "></i>
                <span className="link_name">Post A Project </span>
              </Link>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/postproject">
                  Post A Project
                </Link>
              </li>
              {/* <li>
                <Link to="#">Web Design</Link>
              </li>
              <li>
                <Link to="#">Login Form</Link>
              </li>
              <li>
                <Link to="#">Card Design</Link>
              </li> */}
            </ul>
          </li>
          <li>
            <Link to="/findfreelancer">
              <i className="fas fa-search-dollar    "></i>
              <span className="link_name">Find A Freelancer</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/findfreelancer">
                  Find A Freelancer
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-users" aria-hidden="true"></i>
              <span className="link_name">My Follower</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  My Follower
                </Link>
              </li>
            </ul>
          </li>
          {user && (
            <li>
              <div className="iocn-link">
                <Link to={`/profile/${user.uid}`}>
                  <i class="fas fa-user-circle    "></i>
                  <span className="link_name">View Profile </span>
                </Link>
              </div>
              <ul className="sub-menu">
                <li>
                  <Link className="link_name" to={`/profile/${user.uid}`}>
                    View Profile
                  </Link>
                </li>
              </ul>
            </li>
          )}
          {user && (
            <li>
              <Link to="#" onClick={logout}>
                <i className="fas fa-sign-out-alt    "></i>
                <span className="link_name">Log out</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="#" onClick={logout}>
                    Log out
                  </Link>
                </li>
              </ul>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/login">
                <i className="fas fa-sign-in-alt    "></i>
                <span className="link_name">Log in</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="/login">
                    Log in
                  </Link>
                </li>
              </ul>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/signup">
                <i className="fas fa-sign-in-alt    "></i>
                <span className="link_name">sign up</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="/signup">
                    sign up
                  </Link>
                </li>
              </ul>
            </li>
          )}

          <li>
            <Link to="#">
              <i className="fas fa-cogs    "></i>
              <span className="link_name">Setting</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Setting
                </Link>
              </li>
            </ul>
          </li>
          <li>
            {user && (
              <Link to={`/profile/${user.uid}`}>
                <div className="profile-details">
                  <div className="profile-content">
                    <img src={doc.photoURL} alt="profile" />
                  </div>
                  <div className="name-job">
                    <div className="profile_name text-capitalize">
                      {doc.fullName}
                    </div>
                    <div className="job text-capitalize">
                      {doc.career && doc.career}
                    </div>
                  </div>
                  <i className="fa fa-logout"></i>
                </div>
              </Link>
            )}
          </li>
        </ul>
      </div>
      {/* <section
        className="home-section"
        onClick={() =>
          document.querySelector(".sidebar").classList.toggle("closeNav")
        }
      ></section> */}
    </>
  );
}
