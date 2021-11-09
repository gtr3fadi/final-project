import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { useFirestore } from "../hook/useFirestore";
import { useAuthContext } from "../hook/useAuthContext";


export default function PostProject() {

  const { addDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();
  const uid = user.uid;
  
  console.log (uid);

 
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState([]);
  const [budget, setBudget] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [projectSkills, setProjectSkills] = useState([]);
  const [projectImage, setProjectImage] = useState("");
  const [projectTags, setProjectTags] = useState("");

  const handelAddCategory = (e) => {
    e.preventDefault();
    if (projectCategory.length < 3) {
      setProjectCategory([...projectCategory, e.target.value]);
    }
    if (projectCategory.length === 3) {
      alert("You can't add more than 3 categories");
    }
    if (e.target.value === "") {
      alert("Please enter a category");
    }
    if(e.target.value && !projectCategory.includes(e.target.value)){
      setProjectCategory([...projectCategory, e.target.value]);
    } else {
      alert("You can't add the same category twice");
    }
    // if (e.target.value && !projectCategory.includes(e.target.value)) {
    //   setProjectCategory([...projectCategory, e.target.value]);
    //   console.log(projectCategory);
    // } else {
    //   alert("Category already exist");
    // }
  };

  const handelRemoveCategory = (e) => {
    e.preventDefault();
    if (e.target.value && projectCategory.includes(e.target.value)) {
      setProjectCategory(
        projectCategory.filter((category) => category !== e.target.value)
      );
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      projectName,
      projectDescription,
      projectCategory,
      budget,
      projectDuration
     
    });


  };

  return (
    <div>
      {user && (
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/" className="btn btn-light">
                <i className="fas fa-arrow-left"></i> Back To Dashboard
              </Link>
              <h1 className="display-4 text-center">Add Project</h1>
              <p className="lead text-center">
                Create a project and share with the world
              </p>

              <form
                onSubmit={handelSubmit}
                className="mt-5"
                // onSubmit={async (e) => {
                //   e.preventDefault();
                //   setProjectCategory(
                //     projectCategory
                //   );
                //   console.log(projectCategory);
                //   const doc = {
                //     projectCategory,
                //     projectName,
                //     projectDescription,
                //     budget,
                //     projectDuration,
                //     projectTags,
                //     projectImage,
                //   };
                //   console.log(doc);
                //   try {
                //     await projectFirestore.collection("Projects").add(doc);
                //     alert("Project added successfully");
                //   } catch (error) {
                //     alert(error.message);
                //   }
                // }}
              >
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
                  <label htmlFor="projectDescription">
                    Project Description
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Project Description"
                    name="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    
                  ></textarea>
                  <label htmlFor="projectCategory">Project Category</label>
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
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">
                      Mobile Development
                    </option>
                    <option value="Games Development">Games Development</option>
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
                      Unity Package Manifest Asset Bundle Manifest Asset Bundle
                    </option>
                  </select>
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

                  <label htmlFor="projectduration">
                    Project Duration (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="form-control form-control-lg"
                    placeholder="Project Duration"
                    name="projectduration"
                    value={projectDuration}
                    onChange={(e) => setProjectDuration(e.target.value)}
                    
                  />
                  <label htmlFor="projectTags">Project Tags</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Project Tags"
                    name="projectTags"
                    value={projectTags}
                    onChange={(e) => setProjectTags(e.target.value)}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                  <div className="form-group">
                    <label htmlFor="projectImage">Project Image</label>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      placeholder="Project Image"
                      name="projectImage"
                    />
                  </div>
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
                  Don't have an account?{" "}
                  <Link to="/register">Register</Link>
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
