import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../firebase/firebase";
import { useCollection } from "../hook/useCollection";
import { useAuthContext } from "../hook/useAuthContext";
import Avatar from "../Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Project() {
  const { user } = useAuthContext();
  const { documents: data, error } = useCollection("projects", [
    "createdAt",
    "desc",
  ]);

  const handelClick = (id) => {
    projectFirestore.collection("Projects").doc(id).delete();
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center">Projects</h2>
          <div className="row">
            <div className="col-md-12">
              {data && <h3> Projects Total : ({data.length})</h3>}
              {data &&
                data.map((project) => (
                  <div className="card my-3 bg-light " key={project.id}>
                    <div className="card-body ">
                      <h5 className="card-title text-primary text-center text-capitalize">
                        {project.projectName}
                      </h5>
                      <div className="row d-flex justify-content-between align-items-center">
                        <p className="card-text col-4 m-0 d-flex justify-content-start align-items-center">
                          <Avatar src={project.createdBy.photoURL} />
                          <span className="text-capitalize ms-1 font-weight-bold">
                            {project.createdBy.displayName}
                          </span>
                        </p>
                        {project.projectDuration.toDate() < new Date() ? (
                          <p className="card-text col-8 m-0 d-flex justify-content-end align-items-center">
                            <span className="text-capitalize m-0 font-weight-bold text-danger small">
                              Expired Date :
                              {formatDistanceToNow(
                                project.projectDuration.toDate()
                              )}
                            </span>
                          </p>
                        ) : (
                          <p className="card-text col-8 mb-0 d-flex justify-content-end align-items-center">
                            <span className="text-capitalize ms-2 font-weight-bold small ">
                              Bidding Ends In :
                              {formatDistanceToNow(
                                project.projectDuration.toDate()
                              )}
                            </span>
                          </p>
                        )}
                      </div>
                      <hr />
                      {project.projectDuration.toDate() < new Date() ? (
                        <p class="note note-danger">
                          <strong>Description :</strong>
                          {project.projectDescription}
                        </p>
                      ) : (
                        <p class="note note-primary">
                          <strong>Description :</strong>
                          {project.projectDescription}
                        </p>
                      )}
                     
                      <p className="card-text">
                        <span className="font-weight-bold">
                          {" "}
                          Project Skills :{" "}
                        </span>
                        {project.projectCategory.map((skill) => (
                          <span
                            className="badge badge-primary mx-1"
                            key={skill}
                          >
                            {skill}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link
                        to={`/project/${project.id}`}
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                      <p className="card-text text-right">
                        <small className="text-muted">
                          Posted :{" "}
                          {formatDistanceToNow(project.createdAt.toDate(), {
                            addSuffix: true,
                          })}
                        </small>
                      </p>
                    </div>
                  </div>
                ))}

              {error && <div>{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
