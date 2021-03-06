import React from "react";
import { useCollection } from "./hook/useCollection";
import { useAuthContext } from "./hook/useAuthContext";
import ProjectList from "./project/ProjectList";

const MyProject = () => {
  const { user } = useAuthContext();
  const { documents: data, error } = useCollection("projects", [
    "createdAt",
    "desc",
  ]);
  const filteredData = data ? data.filter((item) => item.uid === user.uid) : [];

  return (
    <div className="container my-5 p-3">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">My Projects</h1>
          {error && <p>Error: {error.message}</p>}
          {data && <ProjectList data={filteredData} />}
          {!data && (
            <div className="spinerContenar">
              <div className="spinner">
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProject;
