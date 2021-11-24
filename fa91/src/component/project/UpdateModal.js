import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Select from "react-select";
import { projectFirestore, timestamp } from "../../firebase/firebase";
import { webDevList } from "../Profile/Skills";
import { useDocument } from "../hook/useDoucment";
import { useFirestore } from "../hook/useFirestore";
import { useCollection } from "../hook/useCollection";

export default function UpdateProject({ data , setUpdateModal}) {
  const [isPending, setIsPending] = useState(false);
  const { updateDocumentField, response } = useFirestore("projects");
  const { documents, error } = useCollection("projects");
  console.log(data);

  const [projectName, setProjectName] = useState(data.projectName);
  const [projectDescription, setProjectDescription] = useState(data.projectDescription);
  const [projectType, setProjectType] = useState(data.projectType);
  const [projectDuration, setProjectDuration] = useState(data.projectDuration.toDate());
  const [budget, setBudget] = useState(data.budget);
  const [projectCategory, setProjectCategory] = useState(data.projectCategory.map((item) => {
    return { value: item, label: item };
  })
  );

  const sk = projectCategory.map((category) => category.value);

  console.log(data);
  if (error) {
    console.log(error);
  }
  if (!documents) {
    return <div>Loading...</div>;
  }

  

  const handelSubmit =async (e) => {
    e.preventDefault();
    const project = {
      projectName,
      projectDescription,
      projectType,
      projectCategory: sk,
      projectDuration:timestamp.fromDate(new Date(projectDuration)),
      budget,
    };
    await updateDocumentField(data.id, project);
    setUpdateModal(false);
  };

  return (
    <div
      className=" fade-in position-fixed top-0 left-0 bottom-0 right-0  z-index-9999 p-1 "
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <div className="container m-auto my-5 p-2">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center text-light">Update Project</h1>
            <p className="lead text-center text-light">
              Update a project and share with the world
            </p>
            <form className="mt-5" onSubmit={handelSubmit}>
              <div className="form-group">
                <label htmlFor="projectName" className="text-light">
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectDescription" className="text-light">
                  Project Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>

              <label className="text-light w-100">
                <span>Project Type</span>
                <br />
                <div className=" btn-group m-auto mb-2" role="group">
                  <input
                    type="radio"
                    className="btn-check m-1"
                    name="projectType"
                    value="frontend"
                    id="frontend"
                    cheched={projectType === "frontend"}
                    onChange={(e) => setProjectType(e.target.value)}
                    
                  />
                  <label
                    htmlFor="frontend"
                    className={`${
                      projectType === "frontend" ? "active" : ""
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
                    cheched={projectType === "backend"}
                    onChange={(e) => {
                      setProjectType(e.target.value);
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
                    cheched={projectType === "fullstack"}
                    onChange={(e) => {
                      setProjectType(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="fullstack"
                    className={`${
                      projectType === "fullstack" ? "active" : ""
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
                    cheched={projectType === "other"}
                    onChange={(e) => {
                      setProjectType(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="other"
                    className={`${
                      projectType === "other" ? "active" : ""
                    } btn btn-secondary `}
                  >
                    Other
                  </label>
                </div>
              </label>
              <label className="text-light w-100">
                <span>Project Category</span>
                <br />
                <Select
                  options={webDevList}
                  isMulti
                  name="projectCategory"
                  defaultValue={projectCategory}
                  onChange={(e) => setProjectCategory(e)}
                />
              </label>
              <div className="form-group">
                <label htmlFor="projectDuration" className="text-light">
                  Project Duration
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="projectDuration"
                  value={projectDuration}
                  onChange={(e) => setProjectDuration(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectBudget" className="text-light">
                  Project Budget
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="projectBudget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
             
                <button type="submit"  className="btn btn-primary btn-block my-2">
                  Update Project
                </button>
              <button className="btn btn-danger btn-block my-2"
                onClick={() => setUpdateModal(false)}
              >Cancel</button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
