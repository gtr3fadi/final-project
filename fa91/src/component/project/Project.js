import React, { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/firebase";
import { useCollection } from "../hook/useCollection";
import { useAuthContext } from "../hook/useAuthContext";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import { useThemeContext } from "../hook/useThemeContext";

export default function Project() {
  const { isLightTheme } = useThemeContext();
  const { user } = useAuthContext();
  const { documents: data, error } = useCollection("projects", [
    "createdAt",
    "desc",
  ]);

  const [currentFilter, setCurrentFilter] = useState("all");

  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredData = data
    ? data.filter((project) => {
        if (currentFilter === "all") {
          return true;
        } else if (currentFilter === "frontend") {
          return project.projectType === "frontend";
        } else if (currentFilter === "backend") {
          return project.projectType === "backend";
        } else if (currentFilter === "fullstack") {
          return project.projectType === "fullstack";
        } else if (currentFilter === "other") {
          return project.projectType === "other";
        } else if (currentFilter === "mine") {
          return project.uid === user.uid;
        }
      })
    : [];

  const handelClick = (id) => {
    projectFirestore.collection("Projects").doc(id).delete();
  };

  return (
    <div className="container  py-3 mt-5 ">
      <div className="row">
        <div className="col-md-12">
          <h2 className={`${isLightTheme? "text-dark" : "text-white"} text-center`}
          >Projects</h2>
          <div className="row">
            <div className="col-md-12">
              {error && <div>{error}</div>}
              {data && (
                <ProjectFilter
                  currentFilter={currentFilter}
                  changeFilter={changeFilter}
                />
              )}
              {data && (
                <ProjectList data={filteredData} handelClick={handelClick} />
              )}
              {!data && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
