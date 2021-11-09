import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../firebase/firebase";
import { useCollection } from "../hook/useCollection";

export default function Project() {
  const { data, isPending, error } = useCollection("projects");

  const handelClick = (id) => {
    projectFirestore.collection("Projects").doc(id).delete();
  };

  return (
    console.log(data),
    (
      <div>
        <h1>Project</h1>
        {isPending && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <div>Total Projects: {data.length}</div>}
        {data && (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <h3 style={{ marginBottom: 0 }}>{item.projectName}</h3>
                <div className="project-description">
                  {item.projectDescription}
                </div>
                {/* <div className="project-created-at">{item.createdAt}</div> */}
                <div>
                  <Link to={`/project/${item.id}`}>View Project</Link>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => handelClick(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
}
