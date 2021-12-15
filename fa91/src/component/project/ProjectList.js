import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useThemeContext } from "../hook/useThemeContext";
import { useAuthContext } from "../hook/useAuthContext";

export default function ProjectList({ data }) {
  const { user } = useAuthContext();
  const { isLightTheme } = useThemeContext();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  return (
    <div>
      {data && (
        <h3
          className={`${
            isLightTheme ? "text-dark" : "text-light"
          } text-center my-2`}
        >
          {" "}
          Projects Total : ({data.length})
        </h3>
      )}
      {data.length === 0 && (
        <h3
          className=""
          className={
            isLightTheme
              ? "text-dark text-muted text-center"
              : "text-light text-muted text-center"
          }
        >
          There is no projects posted in this category
        </h3>
      )}
      {data &&
        data.map((project) => (
          <div
            className="card my-3 bg-light "
            className={
              isLightTheme
                ? "bg-light  shadow card  my-3 p-2 "
                : "bg-dark card text-light  my-3 p-2 shadow bg-dark  bg-opacity-75 bg-gradient"
            }
            key={project.id}
          >
            <div className="card-body ">
              <h5 className="card-title text-primary text-center text-capitalize">
                {project.projectName}
              </h5>
              <p className=" small text-capitalize text-danger text-center m-0 m-auto">
                {project.projectType}
              </p>
              <div className="row d-flex justify-content-between align-items-center">
                <p className="card-text col-12 col-md-4 m-0 d-flex justify-content-start align-items-center">
                  <Link
                    to={`/profile/${project.createdBy.uid}`}
                    className="d-flex justify-content-start align-items-center"
                  >
                    <Avatar uid={project.uid} />
                    <span className="text-capitalize ms-1 font-weight-bold">
                      {project.createdBy.displayName}
                    </span>
                  </Link>
                </p>
                {project.projectDuration.toDate() < new Date() ? (
                  <p className="card-text col-12 col-md-8 m-0 d-flex justify-content-end align-items-center">
                    <span className="text-capitalize m-0 font-weight-bold text-danger small">
                      Expired Date :
                      {formatDistanceToNow(project.projectDuration.toDate())}
                    </span>
                  </p>
                ) : (
                  <p className="card-text col-12 col-md-8 mb-0 d-flex justify-content-end align-items-center">
                    <span className="text-capitalize ms-2 font-weight-bold small ">
                      Bidding Ends In :
                      {formatDistanceToNow(project.projectDuration.toDate())}
                    </span>
                  </p>
                )}
              </div>
              <hr />
              {project.projectDuration.toDate() < new Date() ? (
                <p>
                  <strong>Description :</strong>
                  {project.projectDescription}
                </p>
              ) : (
                <p>
                  <strong>Description :</strong>
                  {project.projectDescription}
                </p>
              )}
              <p className="card-text">
                <span className="text-capitalize font-weight-bold">
                  {" "}
                  Budget :
                </span>
                {project.budget} $
              </p>

              <p className="card-text">
                <span className="font-weight-bold"> Project Skills : </span>
                {project.projectCategory.map((skill) => (
                  <span className="badge badge-primary mx-1" key={skill}>
                    {skill}
                  </span>
                ))}
              </p>
            </div>
            <div className="card-footer row justify-content-center">
              <p className="card-text text-right small col-12 col-md-4">
                <small className="text-muted">
                  Posted :{" "}
                  {formatDistanceToNow(project.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </small>
              </p>
              <p className="col-md-4 col-6 small">
                <small className="text-muted">
                  Comments : ({project.comments.length})
                </small>
              </p>
              <p className="col-md-4 col-6 small">
                <small className="text-muted">
                  {" "}
                  Bidded : ({project.bidd.length})
                </small>
              </p>

              <Link
                to={`/project/${project.id}`}
                className="btn btn-success col-8 col-md-5 mx-1 "
              >
                View Project
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
