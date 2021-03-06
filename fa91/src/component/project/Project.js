import React, {  useState } from "react";
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



  return (
    <div className="container  py-2 pt-5 mt-5 ">
      <div className="row">
        <div className="col-md-12">
          <h2
            className={`${
              isLightTheme ? "text-dark" : "text-white"
            } text-center`}
          >
            Projects
          </h2>
          <div className="row">
            <div className="col-md-12">
              {error && <div>{error}</div>}
              {data && (
                <ProjectFilter
                  currentFilter={currentFilter}
                  changeFilter={changeFilter}
                />
              )}
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
      </div>
    </div>
  );
}
