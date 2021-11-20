import { useCollection } from "../hook/useCollection";
import { useAuthContext } from "../hook/useAuthContext";
import { useThemeContext } from "../hook/useThemeContext";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function FindFreelancer() {
  const { isLightTheme } = useThemeContext();
  const { user } = useAuthContext();
  const { documents: data, error } = useCollection("users");
  if (error) {
    return <div>Error</div>;
  }
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    // card for freelancer
    <div className="container mt-5 pt-5">
      <div className="row row-cols-md-2 row-cols-1 row-cols-lg-3   justify-content-around ">
        {data &&
          data.map((user) => {
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
                        <img
                          src={user.photoURL}
                          className="img-fluid w-50 rounded-circle border border-1 shadow"
                          alt="..."
                        />
                      </div>
                      <div className="col-12 text-center">
                        <h5 className="card-title text-capitalize mb-0 mt-2">
                          {user.fullName}
                        </h5>
                        <p className="card-text m-0 text-muted ">
                          @{user.displayName}
                        </p>
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
                        <h5 className="card-title text-capitalize">
                          top skills
                        </h5>
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
                        <Link
                          to={`/profile/${user.uid}`}
                          className="btn btn-primary"
                        >
                          Viwe Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
