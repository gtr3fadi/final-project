import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../firebase/firebase";

export default function Project() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("Projects").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No Projects Found");
          setIsPending(false);
        } else {
          let result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setData(result);
          setIsPending(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );

    return () => {
      unsub();
    };
  }, []);

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
                <div className="project-image">
                  <img src={item.projectImage} alt="project" />
                </div>
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
