import React, { useState, useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

export default function PostProject() {
  const { user } = useContext(ThemeContext);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectTags, setProjectTags] = useState("");

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <a href="/" className="btn btn-light">
              <i className="fas fa-arrow-left"></i> Back To Dashboard
            </a>
            <h1 className="display-4 text-center">Add Project</h1>
            <p className="lead text-center">
              Create a project and share with the world
            </p>
            <div className="row">
              // add by fa
              <div className="col-lg-4 col-md-12 mb-4">
                <div className="form-outline mb-3">
                  <input type="text" id="form1" className="form-control" />
                  <label
                    className="form-label"
                    htmlFor="form1"
                    style={{
                      marginLeft: "0px",
                    }}
                  >
                    Example label
                  </label>
                  <div className="form-notch">
                    <div
                      className="form-notch-leading"
                      style={{
                        width: "9px",
                      }}
                    ></div>
                    <div
                      className="form-notch-middle"
                      style={{
                        width: "88.8px",
                      }}
                    ></div>
                    <div className="form-notch-trailing"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12 mb-4">
                <div className="form-outline mb-3">
                  <input type="text" id="form1" className="form-control" />
                  <label
                    className="form-label"
                    htmlFor="form1"
                    style={{
                      marginLeft: "0px",
                    }}
                  >
                    Example label
                  </label>
                  <div className="form-notch">
                    <div
                      className="form-notch-leading"
                      style={{
                        width: "9px",
                      }}
                    ></div>
                    <div
                      className="form-notch-middle"
                      style={{
                        width: "88.8px",
                      }}
                    ></div>
                    <div className="form-notch-trailing"></div>
                  </div>
                </div>
              </div>
            </div>{" "}
            // by fadi
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(
                  projectName,
                  projectDescription,
                  projectCategory,
                  projectTags
                );
              }}
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
                <label htmlFor="projectDescription">Project Description</label>
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Project Description"
                  name="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                ></textarea>
                <label htmlFor="projectCategory">Project Category</label>
                <select
                  className="form-control form-control-lg"
                  name="projectCategory"
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
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
                <label htmlFor="projectTags">Project Tags</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Project Tags"
                  name="projectTags"
                  value={projectTags}
                  onChange={(e) => setProjectTags(e.target.value)}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
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
    </div>
  );
}
