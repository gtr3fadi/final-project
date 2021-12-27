import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useThemeContext } from "../hook/useThemeContext";







const FindFreelancerCard = ({ user }) => {

      const { isLightTheme } = useThemeContext();

    return (
      <div className="col ">
        <div
          className={
            isLightTheme
              ? "card mb-4 p-0  bg-light   shadow "
              : "card mb-4  p-0 text-light shadow bg-dark  bg-opacity-25 bg-gradient"
          }
        >
          <div
            className="card-body pb-3"
            style={{
              cursor: "context-menu",
            }}
          >
            <div className="row">
              <div className="col-12 text-center">
                <Avatar uid={user.uid} width={"150px"} />
              </div>
              <div className="col-12 text-center">
                <h5 className="card-title text-capitalize mb-0 mt-2">
                  {user.fullName}
                </h5>
                <p className="card-text m-0 text-muted ">@{user.displayName}</p>
                <p
                  className="card-text text-capitalize mb-0  text-light rounded-6 "
                  style={{
                    backgroundColor: "#e91e63",
                  }}
                >
                  {user.career}
                </p>
                <h6
                  className="card-text mt-1"
                  style={{
                    minHeight: "50px",
                  }}
                >
                  {user.about.substring(0, 50)}....
                </h6>
                <h5 className="card-title text-capitalize">top skills</h5>
                <div className="d-flex justify-content-around align-items-center">
                  {user.skills
                    .map((skill) => {
                      return (
                        <span className="badge badge-pill badge-primary mr-2">
                          {skill}
                        </span>
                      );
                    })
                    .slice(0, 3)}
                </div>
              </div>
              <hr className="my-2" />

              <div className="col-12 text-center">
                <Link to={`/profile/${user.uid}`} className="btn btn-primary">
                  Viwe Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FindFreelancerCard
