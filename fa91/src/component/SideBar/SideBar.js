import { Link } from "react-router-dom";
import "./SideBar.css";
import { useAuthContext } from ".././hook/useAuthContext";
import { useCollection } from "../hook/useCollection";


export default function SideBar() {
  const { user } = useAuthContext();
  
  const { documents, error } = useCollection("users");
  if (!documents) return <p className="spinner">Loading...</p>;

  const doc = user ? documents.find(doc => doc.id === user.uid) : null;

  

  
  

  

  return (
    <>
      <div className="sidebar closeNav">
        <div className="logo-details">
          <i
            className="fa fa-bars text-light"
            onClick={() => {
              document.querySelector(".sidebar").classList.toggle("closeNav");
            }}
          ></i>
          <span className="logo_name fst-italic ">Div Space</span>
        </div>
        <hr
          className="m-0 "
          style={{
            border: "1px solid #fff",
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
            <Link to="#">
              <i className="fas fa-search-dollar    "></i>
              <span className="link_name">Find A Freelancer</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
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
          <li>
            <div className="iocn-link">
              <Link to="#">
                <i class="fas fa-user-circle    "></i>
                <span className="link_name">View Profile </span>
              </Link>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  View Profile
                </Link>
              </li>
              {/* <li>
                <Link to="#">UI Face</Link>
              </li>
              <li>
                <Link to="#">Pigments</Link>
              </li>
              <li>
                <Link to="#">Box Icons</Link>
              </li> */}
            </ul>
          </li>
          <li>
            <Link to="#">
            <i className="fas fa-sign-out-alt    "></i>
              <span className="link_name">Log out</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Log out
                </Link>
              </li>
            </ul>
          </li>
         
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
      <section
        className="home-section"
        onClick={() =>
          document.querySelector(".sidebar").classList.toggle("closeNav")
        }
      ></section>
    </>
  );
}
