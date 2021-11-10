import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../firebase/firebase";
import { useCollection } from "./hook/useCollection";
import { useAuthContext } from "./hook/useAuthContext";
import { useFirestore } from "./hook/useFirestore";

const MyProject = () => {
    const {deleteDocument,updateDocument , response }= useFirestore("projects");
    const { user } = useAuthContext();
    const { documents: data, error } = useCollection(
      "projects",
      ["createdAt", "desc"],
      ["uid", "==", user.uid]
    );
    

    return (
      <div>
        <h1>My Projects</h1>
        {error && <p>Error: {error.message}</p>}
        {data && <div>Total Projects: {data.length}</div>}
        {data &&
          data.map((project) => (
            <div key={project.id}>
              <h2 className="project-title">{project.projectName}</h2>
              <p>{project.projectDescription}</p>
              <div>
                <h5> created by {user.displayName}</h5>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => deleteDocument(project.id)}
              >
                Delete
              </button>
              // update
              <Link to={`/project/edit/${project.id}`}>
                <button className="btn btn-primary">Update</button>
              </Link>
              <hr />
            </div>
          ))}
      </div>
    );
}

export default MyProject;
