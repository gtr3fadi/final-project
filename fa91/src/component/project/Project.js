import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../firebase/firebase";

export default function Project() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection("Projects")
      .get()
      .then((snapshot) => {
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
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);

  return (
    console.log(data),
    (
      <div>
        <h1>Project</h1>
        {isPending && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
                  <ul>
                      {data.map((item) => (
                          <li key={item.id}>
                              <h3 style={{ marginBottom: 0 }}>{item.ProjectName}</h3>
                              <div className="project-description">{item.ProjectDescription}</div>
                              <div className="project-image">
                                    <img src={item.ProjectImage} alt="project" />
                              </div>
                              <div >
                                    <Link to={`/project/${item.id}`}>View Project</Link>
                              </div>

                          </li>
                          
                      ))}
                  </ul>
                  
        )}
      </div>
    )
  );
}
