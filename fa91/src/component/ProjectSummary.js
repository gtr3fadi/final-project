import Avatar from "./Avatar";
import {useState} from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "./hook/useAuthContext";
import { useFirestore } from "./hook/useFirestore";
import { timestamp } from "../firebase/firebase";
import { Link } from "react-router-dom";


export default function ProjectSummary({ project }) {
  const { response, updateDocumentField } = useFirestore("projects");
  

  const { user } = useAuthContext();

  const ToggleClick = async () => {
    const biddToAdd = {
      user: user.uid,
      createdAt: timestamp.fromDate(new Date()),
      project: project.id,
      biddId: user.uid + timestamp.fromDate(new Date()),
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    await updateDocumentField(project.id, {
      bidd: [...project.bidd, biddToAdd],
    });
  };

  const ToggleClickReomvebidder = async () => {
    await updateDocumentField(project.id, {
      bidd: project.bidd.filter((bidd) => bidd.user !== user.uid),
    });
  };

  return (
    <div className="project-summary mt-5">
      <div className="card my-3 bg-light " key={project.id}>
        <div className="card-body ">
          <h5 className="card-title text-primary text-center text-capitalize">
            {project.projectName}
          </h5>
          <div className="row d-flex justify-content-between align-items-center">
            <Link
              to={`/profile/${project.createdBy.uid}`}
              className="card-text col-md-4 col-12 m-0 d-flex justify-content-start align-items-center"
            >
              <Avatar src={project.createdBy.photoURL} />
              <span className="text-capitalize ms-1 font-weight-bold">
                {project.createdBy.displayName}
              </span>
            </Link>
            {project.projectDuration.toDate() < new Date() ? (
              <p className="card-text col-12 col-md-6 m-0 d-flex justify-content-end align-items-center">
                <span className="text-capitalize m-0 font-weight-bold text-danger small">
                  Expired Date :
                  {formatDistanceToNow(project.projectDuration.toDate())}
                </span>
              </p>
            ) : (
              <p className="card-text col-md-6 col-12 mb-0 d-flex justify-content-end align-items-center">
                <span className="text-capitalize ms-2 font-weight-bold small ">
                  Bidding Ends In :
                  {formatDistanceToNow(project.projectDuration.toDate())}
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
            <span className="font-weight-bold"> Project Skills : </span>
            {project.projectCategory.map((skill) => (
              <span className="badge badge-primary mx-1" key={skill}>
                {skill}
              </span>
            ))}
          </p>
        </div>
        <div className="card-footer row d-flex justify-content-between align-items-center ">
          <p className=" m-0 col-12 col-md-4">
            <small className="text-muted">
              Posted :{" "}
              {formatDistanceToNow(project.createdAt.toDate(), {
                addSuffix: true,
              })}
            </small>
          </p>
          <p className="m-0 col-12 col-md-4">
            <small className="text-muted">
              {" "}
              Bidded :({project.bidd.length} ){" "}
            </small>
          </p>
          <div className="col-12 col-md-4 d-flex justify-content-end align-items-center">
            {project.bidd.filter((b) => {
              return b.user === user.uid;
            }).length === 0 ? (
              <button className="btn btn-success btn-sm " onClick={ToggleClick}>
                Bid
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={ToggleClickReomvebidder}
              >
                Bidded
              </button>
            )}
           
          </div>
        </div>
      </div>
    </div>
  );
}
