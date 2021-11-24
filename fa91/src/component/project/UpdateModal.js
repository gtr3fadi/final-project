import React, { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { useFirestore } from "../hook/useFirestore";
import { useAuthContext } from "../hook/useAuthContext";
import { timestamp } from "../../firebase/firebase";
import Select from "react-select";





export default function UpdateModal({ projectModal, setUpdateModal }) {
    const { addDocument, response } = useFirestore("projects");
    const { user } = useAuthContext();
    const history = useHistory();
    const [isPending, setIsPending] = useState(false);


     const [projectName, setProjectName] = useState(project.projectName);
     const [projectDescription, setProjectDescription] = useState(project.projectDescription);
     const [projectType, setProjectType] = useState(project.projectType);
    const [projectCategory, setProjectCategory] = useState(
        project.projectCategory.map(category => {
            return { value: category, label: category };
        })
     );
     const [budget, setBudget] = useState(project.budget);
    const [projectDuration, setProjectDuration] = useState(project.projectDuration);
    

     const handelAddCategory = (e) => {
       e.preventDefault();
       if (e.target.value === "") {
         alert("Please enter a category");
         return;
       }
       if (projectCategory.length === 3) {
         alert("You can't add more than 3 categories");
         return;
       }

       if (projectCategory.includes(e.target.value)) {
         alert("You can't add same category");
         return;
       }

       if (projectCategory.length < 3) {
         setProjectCategory([...projectCategory, e.target.value]);
       }

       if (e.target.value && !projectCategory.includes(e.target.value)) {
         setProjectCategory([...projectCategory, e.target.value]);
       }
     };

     const handelRemoveCategory = (e) => {
       e.preventDefault();
       if (e.target.value && projectCategory.includes(e.target.value)) {
         setProjectCategory(
           projectCategory.filter((category) => category !== e.target.value)
         );
       }
     };

     const createdBy = {
       displayName: user.displayName,
       photoURL: user.photoURL,
       uid: user.uid,
     };

     const project = {
       projectName,
       projectDescription,
       projectType,
       projectCategory,
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
    <div
      className=" position-fixed top-0 left-0 bottom-0 right-0  z-index-9999 p-1 "
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        {user && (
          <div className="container m-auto my-5 p-2">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Project</h1>
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
                          onChange={(e) =>
                            setProjectDescription(e.target.value)
                          }
                          required
                        ></textarea>
                      </div>
                    )}

                    {projectDescription && (
                      <label className="animated animatedFadeInUp fadeInUp">
                        <span> Project Type </span>
                        <br />
                        <div className="btn-group  m-auto  mb-2 ">
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
                            className="btn btn-secondary"
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
                            className="btn btn-secondary"
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
                            className="btn btn-secondary"
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
                          <label htmlFor="other" className="btn btn-secondary">
                            Other
                          </label>
                        </div>
                      </label>
                    )}
                    <br />

                    {projectType && (
                      <label className="animated animatedFadeInUp fadeInUp">
                        <span> Project Category </span>
                        <br />

                        <select
                          className="form-control form-control-lg"
                          name="projectCategory"
                          value={projectCategory
                            .map((category) => category.toLowerCase())
                            .join(",")}
                          onChange={(e) => handelAddCategory(e)}
                        >
                          <option value="">Select Category</option>
                          <option value="react">React</option>
                          <option value="javascript">Javascript</option>
                          <option value="HTML">HTML</option>
                          <option value="CSS">CSS</option>
                          <option value="NodeJS">NodeJS</option>
                          <option value="C++">C++</option>
                          <option value="Python">Python</option>
                          <option value="Java">Java</option>
                          <option value="C#">C#</option>
                          <option value="PHP">PHP</option>
                          <option value="SQL">SQL</option>
                          <option value="CSS3">CSS3</option>
                          <option value="Bootstrap">Bootstrap</option>
                          <option value="Materialize">Materialize</option>
                          <option value="Material-UI">Material-UI</option>
                          <option value="HTML5">HTML5</option>
                          <option value="angular">Angular</option>
                          <option value="vue">Vue</option>
                          <option value="node">Node</option>
                          <option value="express">Express</option>
                          <option value="mongo">Mongo</option>
                          <option value="mysql">Mysql</option>
                          <option value="mongodb">Mongodb</option>
                          <option value="php">Php</option>
                          <option value="laravel">Laravel</option>
                          <option value="symfony">Symfony</option>
                          <option value="django">Django</option>
                          <option value="flutter">Flutter</option>
                          <option value="react-native">React Native</option>
                          <option value="ionic">Ionic</option>
                          <option value="android">Android</option>
                          <option value="ios">Ios</option>
                          <option value="Web Development">
                            Web Development
                          </option>
                          <option value="Mobile Development">
                            Mobile Development
                          </option>
                          <option value="Games Development">
                            Games Development
                          </option>
                          <option value="unity">Unity</option>
                          <option value="unreal">Unreal</option>
                          <option value="unity-engine">Unity Engine</option>
                          <option value="unity-script">Unity Script</option>
                          <option value="unity-shader">Unity Shader</option>
                          <option value="unity-assets">Unity Assets</option>
                          <option value="unity-scriptable-object">
                            Unity Scriptable Object
                          </option>
                          <option value="unity-package">Unity Package</option>
                          <option value="unity-project">Unity Project</option>
                          <option value="unity-package-manifest">
                            Unity Package Manifest
                          </option>
                          <option value="unity-package-manifest-asset">
                            Unity Package Manifest Asset
                          </option>
                          <option value="unity-package-manifest-asset-bundle">
                            Unity Package Manifest Asset Bundle
                          </option>
                          <option value="unity-package-manifest-asset-bundle-manifest">
                            Unity Package Manifest Asset Bundle Manifest
                          </option>
                          <option value="unity-package-manifest-asset-bundle-manifest-asset">
                            Unity Package Manifest Asset Bundle Manifest Asset
                          </option>
                          <option value="unity-package-manifest-asset-bundle-manifest-asset-bundle">
                            Unity Package Manifest Asset Bundle Manifest Asset
                            Bundle
                          </option>
                        </select>
                      </label>
                    )}

                    <div>
                      {projectCategory &&
                        projectCategory.map((category) => (
                          <span className="badge badge-pill badge-secondary m-1">
                            <button
                              onClick={handelRemoveCategory}
                              className="btn btn-danger btn-sm"
                            >
                              {category}

                              <i className="fas fa-times  ms-2"></i>
                            </button>
                          </span>
                        ))}
                    </div>
                    {!projectCategory.length == 0 && (
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
                          <button className="btn btn-primary m-auto text-capitalize text-xl-center ">
                            <span className="spinner-border spinner-border-sm"></span>
                            creat...
                          </button>
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
    </div>
  );
}
