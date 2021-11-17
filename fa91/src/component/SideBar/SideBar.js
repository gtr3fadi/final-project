import { Link } from "react-router-dom";
import "./SideBar.css";

export default function SideBar() {
  return (
    <div className="sidebar mt-5 pt-5">
      <div className="sidebar ">
        <div className="logo-details">
          <i className="fa fa-bars text-light"></i>
          <span className="logo_name ">Div Space</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="#">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="#">
                  Category
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="#">
                <i className="bx bx-collection"></i>
                <span className="link_name">Category</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="#">
                  Category
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
            <div className="profile-details">
              <div className="profile-content">
                <img src={""} alt="profileImg" />
              </div>
              <div className="name-job">
                <div className="profile_name">Prem Shahi</div>
                <div className="job">Web Desginer</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
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
