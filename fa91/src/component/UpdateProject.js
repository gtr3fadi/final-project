import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { projectFirestore } from "../firebase/firebase";

export default function UpdateProject() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection("projects")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setData(doc.data());
          setIsPending(false);
        } else {
          setError("could not Find That Project");
          setIsPending(false);
        }
      });
  }, [id]);


  return (
    <div>
      <h1>Update Project</h1>
      {isPending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="container m-auto my-5 p-2">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Update Project</h1>
              <p className="lead text-center">
                Update a project and share with the world
              </p>
              <form
                className="mt-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  projectFirestore
                    .collection("projects")
                    .doc(id)
                    .update({
                      projectName: data.projectName,
                      projectDescription: data.projectDescription,
                      projectCategory: data.projectCategory,
                    })
                    .then(() => {
                      history.push(`/myproject`);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <div className="form-group">
                  <label htmlFor="projectName">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="projectName"
                    value={data.projectName}
                    onChange={(e) => {
                      setData({
                        ...data,
                        projectName: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectDescription">
                    Project Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="projectDescription"
                    value={data.projectDescription}
                    onChange={(e) => {
                      setData({
                        ...data,
                        projectDescription: e.target.value,
                      });
                    }}
                  />
                </div>

                <label>
                  <span>Project Type</span>
                  <br />
                  <div className=" btn-group m-auto mb-2" role="group">
                    <input
                      type="radio"
                      className="btn-check m-1"
                      name="projectType"
                      value="frontend"
                      id="frontend"
                      cheched={data.projectType === "frontend"}
                      onChange={(e) => {
                        setData({
                          ...data,
                          projectType: e.target.value,
                        });
                      }}
                    />
                    <label
                      htmlFor="frontend"
                      className={`${
                        data.projectType === "frontend" ? "active" : ""
                      } btn btn-secondary `}
                    >
                      Frontend
                    </label>
                    <input
                      type="radio"
                      className="btn-check m-1"
                      name="projectType"
                      value="backend"
                      id="backend"
                      cheched={data.projectType === "backend"}
                      onChange={(e) => {
                        setData({
                          ...data,
                          projectType: e.target.value,
                        });
                      }}
                    />
                    <label
                      htmlFor="backend"
                      className={`${
                        data.projectType === "backend" ? "active" : ""
                      } btn btn-secondary `}
                    >
                      Backend
                    </label>
                    <input
                      type="radio"
                      className="btn-check m-1"
                      name="projectType"
                      value="fullstack"
                      id="fullstack"
                      cheched={data.projectType === "fullstack"}
                      onChange={(e) => {
                        setData({
                          ...data,
                          projectType: e.target.value,
                        });
                      }}
                    />
                    <label
                      htmlFor="fullstack"
                      className={`${
                        data.projectType === "fullstack" ? "active" : ""
                      } btn btn-secondary `}
                    >
                      Fullstack
                    </label>
                    <input
                      type="radio"
                      className="btn-check m-1"
                      name="projectType"
                      value="other"
                      id="other"
                      cheched={data.projectType === "other"}
                      onChange={(e) => {
                        setData({
                          ...data,
                          projectType: e.target.value,
                        });
                      }}
                    />
                    <label
                      htmlFor="other"
                      className={`${
                        data.projectType === "other" ? "active" : ""
                      } btn btn-secondary `}
                    >
                      Other
                    </label>
                  </div>
                </label>
                <label>
                  <span>Project Category</span>
                  <br />
                  <select
                    className="form-control form-control-lg"
                    name="projectCategory"
                    onChange={(e) => {
                      setData({
                        ...data,
                        projectCategory: e.target.value.split(","),
                      });
                    }}
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
                </label>

                {data.projectCategory.map((category) => (
                  <span className="badge badge-secondary m-1" key={category}>
                    {category}
                  </span>
                ))}

                <button type="submit">Update Project</button>
                <Link to="/myproject">
                  <button type="button" className="btn btn-danger">
                    Cancel
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
