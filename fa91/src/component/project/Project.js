import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../firebase/firebase";
import { useCollection } from "../hook/useCollection";
import { useAuthContext } from "../hook/useAuthContext";

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
    console.log(data),
    (
      <div>
        <h1>Project</h1>

        {error && <p>Error: {error.message}</p>}
        {data && <div>Total Projects: {data.length}</div>}
        {data && (
          <div className="project-list">
            {data.map((project) => (
              <div key={project.id} className="project-item">
                <div>
                  <h3>{project.projectName}</h3>
                  <p>{project.projectDescription}</p>
                  <p className="project-item-createdAt">
                    Created At: {project.createdAt.toDate().toLocaleString()}
                  </p>
                  <p className="project-item-createdAt">
                    Created By: {project.createdBy.displayName}
                  </p>
                </div>
                <div>
                  <Link to={`/project/${project.id}`}>
                    <button>View</button>
                  </Link>
                </div>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}
