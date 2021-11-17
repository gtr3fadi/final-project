import { Link } from "react-router-dom";
import "./SideBar.css";
import { useAuthContext } from ".././hook/useAuthContext";
import { useDocument } from "../hook/useDoucment";
import Avatar from "../Avatar";

export default function SideBar() {
  const { user } = useAuthContext();
  const { doc, error, isPending } = useDocument("users", user.uid);
  if (!doc) return null;

  

  return (
    <div className=" mt-5 pt-5">
      <div className="sidebar">
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
          <li>
            <div className="iocn-link" >
              <Link to="/project">
                <i class="fas fa-project-diagram    "></i>
                <span className="link_name">Projects</span>
              </Link>
                          <i className="fa fa-angle-down arrow"
                             
                                
                          ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/project">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="#">HTML & CSS</Link>
              </li>
              <li>
                <Link to="#">JavaScript</Link>
              </li>
              <li>
                <Link to="#">PHP & MySQL</Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="#">
                <i className="fa fa-book"></i>
                <span className="link_name">Posts</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  Posts
                </Link>
              </li>
              <li>
                <Link to="#">Web Design</Link>
              </li>
              <li>
                <Link to="#">Login Form</Link>
              </li>
              <li>
                <Link to="#">Card Design</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Analytics</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Analytics
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <i className="bx bx-line-chart"></i>
              <span className="link_name">Chart</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Chart
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="#">
                <i className="bx bx-plug"></i>
                <span className="link_name">Plugins</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  Plugins
                </Link>
              </li>
              <li>
                <Link to="#">UI Face</Link>
              </li>
              <li>
                <Link to="#">Pigments</Link>
              </li>
              <li>
                <Link to="#">Box Icons</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <i className="bx bx-compass"></i>
              <span className="link_name">Explore</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Explore
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <i className="bx bx-history"></i>
              <span className="link_name">History</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  History
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">
              <i className="bx bx-cog"></i>
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
                <i className="bx bx-log-out"></i>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="home-content">
          <i className="bx bx-menu"></i>
          <span className="text">Drop Down Sidebar</span>
        </div>
      </section>
    </div>
  );
}
