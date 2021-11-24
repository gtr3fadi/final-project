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
