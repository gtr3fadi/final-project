import React, { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { useFirestore } from "../hook/useFirestore";
import { useAuthContext } from "../hook/useAuthContext";
import { projectStorage, timestamp } from "../../firebase/firebase";
import Select from "react-select";
import { webDevList } from "../Profile/Skills";
import { useThemeContext } from "../hook/useThemeContext";

export default function PostProject() {
  const { isLightTheme } = useThemeContext();
  const { addDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useHistory();
  const [isPending, setIsPending] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectCategory, setProjectCategory] = useState([]);
  const [budget, setBudget] = useState("");
  const [projectDuration, setProjectDuration] = useState("");

  const [skills, setSkills] = useState("");
  const [selectValue, setSelectValue] = useState([]);
  console.log(selectValue);

  const sk = selectValue.map((item) => {
    return item.value;
  });


  const createdBy = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
  };

  const project = {
    projectName,
    projectDescription,
    projectType,
    projectCategory: sk,
    budget,
    projectDuration: timestamp.fromDate(new Date(projectDuration)),
    comments: [],
    createdBy,
    uid: user.uid,
    bidd: [],
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    await addDocument(project);
    if (!response.error) {
      alert("Project added successfully");

      history.push("/myproject");
    }
  };

  return (
    <div>
      {user && (
        <div className="container m-auto my-5 p-3">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1
                className="display-4 text-center"
                style={{ color: isLightTheme ? "black" : "white" }}
              >
                Add Project
              </h1>
              <p className="lead text-center">
                Create a project and share with the world
              </p>

              <form onSubmit={handelSubmit} className="mt-5">
                <div className="form-group">
                  <label htmlFor="projectName">Project Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Project Title"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  {projectName && (
                    <div className="animated animatedFadeInUp fadeInUp">
                      <label htmlFor="projectDescription">
                        Project Description
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        placeholder="Project Description"
                        name="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  )}

                  {projectDescription && (
                    <label className="animated animatedFadeInUp fadeInUp w-100">
                      <span> Project Type </span>
                      <br />
                      <div className="btn-group row w-100  m-auto  mb-2 ">
                        <input
                          type="radio"
                          className="btn-check m-1"
                          name="projectType"
                          id="frontend"
                          value="frontend"
                          onChange={(e) => setProjectType(e.target.value)}
                          cheched={projectType === "frontend"}
                        />
                        <label
                          htmlFor="frontend"
                          className="btn btn-secondary px-1   col-3"
                        >
                          Frontend
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="projectType"
                          id="backend"
                          value="backend"
                          onChange={(e) => setProjectType(e.target.value)}
                          cheched={projectType === "backend"}
                          autoComplete="off"
                        />
                        <label
                          htmlFor="backend"
                          className="btn btn-secondary px-1 col-3"
                        >
                          Backend
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="projectType"
                          id="fullstack"
                          value="fullstack"
                          onChange={(e) => setProjectType(e.target.value)}
                          cheched={projectType === "fullstack"}
                          autoComplete="off"
                        />
                        <label
                          htmlFor="fullstack"
                          className="btn btn-secondary col-4 px-1"
                        >
                          Fullstack
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="projectType"
                          id="other"
                          value="other"
                          onChange={(e) => setProjectType(e.target.value)}
                          cheched={projectType === "other"}
                          autoComplete="off"
                        />
                        <label
                          htmlFor="other"
                          className="btn btn-secondary px-1  col-2"
                        >
                          Other
                        </label>
                      </div>
                    </label>
                  )}
                  <br />

                  {projectType && (
                    <label className="animated animatedFadeInUp fadeInUp w-100">
                      <span> Project Category </span>
                      <br />

                      <Select
                        classNamePrefix="select"
                        defaultValue={selectValue}
                        isMulti
                        name="color"
                        options={webDevList}
                        onChange={(opt) => setSelectValue(opt)}
                      />
                    </label>
                  )}

                  <div></div>
                  {!sk.length == 0 && (
                    <div className="animated animatedFadeInUp fadeInUp">
                      <label htmlFor="budget">Budget (Dollars $ ) </label>
                      <input
                        type="number"
                        min="0"
                        className="form-control form-control-lg"
                        placeholder="Budget"
                        name="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                      />
                    </div>
                  )}
                  {budget && (
                    <div className="animated animatedFadeInUp fadeInUp">
                      <label htmlFor="projectduration">
                        Project Duration (days)
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        placeholder="Project Duration"
                        name="projectduration"
                        value={projectDuration}
                        onChange={(e) => setProjectDuration(e.target.value)}
                      />
                    </div>
                  )}
                  {projectDuration && (
                    <div className="text-center m-auto mt-4 animated animatedFadeInUp fadeInUp">
                      {!isPending && (
                        <button
                          type="submit"
                          className="btn btn-primary m-auto text-capitalize text-xl-center "
                        >
                          create a project
                        </button>
                      )}
                      {isPending && (
                        <div className="spinerContenar">
                          <div className="spinner">
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron">
                <h1 className="display-4">
                  <i className="fas fa-exclamation-triangle"></i>
                  Please Login to Create a Project
                </h1>
                <p className="lead">
                  <Link to="/login">Login</Link>
                </p>

                <hr className="my-4" />
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>

                <p className="lead">
                  <Link to="/">Home</Link>
                </p>

                <p className="lead">
                  <Link to="/projects">Projects</Link>
                </p>

                <p className="lead">
                  <Link to="/about">About</Link>
                </p>

                <p className="lead">
                  <Link to="/contact">Contact</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
