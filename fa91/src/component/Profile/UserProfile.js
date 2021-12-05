import Select from "react-select";
import { webDevList } from "./Skills";
import { useState } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useFirestore } from "../hook/useFirestore";
import { v4 as uuidv4 } from "uuid";
import { useThemeContext } from "../hook/useThemeContext";
import RWdeleteModule from "../RWdeleteModule";

export default function UserProfile({ doc }) {
  const { isLightTheme } = useThemeContext();

  const { user } = useAuthContext();
  const { updateDocumentField, response } = useFirestore("users");

  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [selectValue, setSelectValue] = useState([]);
  const [RWdelete, setRWdelete] = useState(false);

  const sk = selectValue.map((item) => {
    return item.value;
  });

  const [RecentWorkTitle, setRecentWorkTitle] = useState("");
  const [RecentWorkError, setRecentWorkError] = useState(null);
  const [RecentWorkLink, setRecentWorkLink] = useState("");
  const [RecentWorkDescription, setRecentWorkDescription] = useState("");

  const handelRecentWorkSubmit = async (e) => {
    e.preventDefault();
    if (!RecentWorkTitle) {
      setRecentWorkError("Please enter a title");
      return;
    }
    if (!RecentWorkLink) {
      setRecentWorkError("Please enter a link");
      return;
    }
    if (!RecentWorkDescription) {
      setRecentWorkError("Please enter a description");
      return;
    }
    setRecentWorkError(null);
    const data = {
      title: RecentWorkTitle,
      link: RecentWorkLink,
      description: RecentWorkDescription,
      id: uuidv4(),
    };
    await updateDocumentField(doc.id, {
      recentWork: doc.recentWork ? [...doc.recentWork, data] : [data],
    });
    setRecentWorkTitle("");
    setRecentWorkLink("");
    setRecentWorkDescription("");
  };

  return (
    <>
      <h5 className="mt-3">User Profile</h5>
      <hr />
      <div className="row">
        <div className="col-12">
          <h6 className="font-weight-bold">About Me</h6>
          {doc.about && <p className=" text-capitalize ">{doc.about}</p>}
          {!doc.about && user.uid !== doc.id && (
            <span className="text-muted">Not Added yet</span>
          )}
          {!doc.about && user.uid === doc.id && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateDocumentField(doc.id, {
                  about: about,
                });
              }}
            >
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="about"
                  placeholder="Enter your about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
                <button className="btn btn-primary ">Update</button>
              </div>
            </form>
          )}

          <hr />
          <h6 className="font-weight-bold">My Skills</h6>
          {doc.skills &&
            doc.skills.map((skill) => (
              <span className="badge badge-pill badge-secondary m-1">
                <button className="btn btn-danger btn-sm">{skill}</button>
              </span>
            ))}
          {!doc.skills && user.uid !== doc.id && (
            <span className="text-muted">Not Added yet</span>
          )}
          {(!doc.skills || doc.skills.length === 0) && user.uid === doc.id && (
            <>
              <Select
                classNamePrefix="select"
                defaultValue={selectValue}
                isMulti
                name="color"
                options={webDevList}
                onChange={(opt) => setSelectValue(opt)}
              />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateDocumentField(doc.id, {
                    skills: sk,
                  });
                }}
              >
                <button className="btn btn-primary ">Update</button>
              </form>
            </>
          )}

          <hr />
        </div>

        <div className="col-md-12">
          <h5 className="mt-2 mb-3">
            <span className="fa fa-clock-o ion-clock float-right"></span> Recent
            Works
          </h5>

          {user.uid === doc.id && (
            <form onSubmit={handelRecentWorkSubmit}>
              <div className="form-group">
                {RecentWorkError && (
                  <p className="text-danger">{RecentWorkError}</p>
                )}
                <label className="w-100">
                  <span className="fa fa-pencil">Title</span>
                  <input
                    placeholder="Enter Title"
                    value={RecentWorkTitle}
                    onChange={(e) => setRecentWorkTitle(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </label>
              </div>
              <div className="form-group">
                <label className="w-100">
                  <span className="fa fa-pencil">Link</span>
                  <input
                    placeholder="https://example.com"
                    pattern="https://.*"
                    type="url"
                    value={RecentWorkLink}
                    onChange={(e) => setRecentWorkLink(e.target.value)}
                    className="form-control"
                  />
                </label>
              </div>

              <div className="form-group">
                <label className="w-100">
                  <span className="fa fa-pencil">Description</span>
                  <textarea
                    placeholder="Enter Description"
                    type="text"
                    value={RecentWorkDescription}
                    onChange={(e) => setRecentWorkDescription(e.target.value)}
                    className="form-control"
                  />
                </label>
              </div>
              <button className="btn btn-primary my-2" type="submit">
                Add
              </button>
            </form>
          )}
          <hr />

          <div className="row col-12 m-auto">
            <div className="col-12 m-auto">
              {(!doc.recentWork || !doc.recentWork.length) &&
                user.uid !== doc.id && (
                  <span
                    className={`${
                      isLightTheme ? "text-muted" : "text-white-50"
                    }`}
                  >
                    Not Added yet
                  </span>
                )}

              {doc.recentWork && doc.recentWork.length > 0 && (
                <>
                  {doc.recentWork.map((work) => (
                    <div
                      className={`${
                        isLightTheme ? "bg-light " : "bg-dark"
                      } shadow rounded p-1 mb-2 bg-opacity-75 bg-gradient card `}
                    >
                      <div className="card-body">
                        {user.uid === doc.id && (
                          <>
                            <button
                              className=" float-end btn btn-sm bg-danger text-light"
                              onClick={() => setRWdelete(true)}
                            >
                              <i className="fa fa-times"></i>
                            </button>
                            {RWdelete && (
                              <RWdeleteModule
                                work={work}
                                doc={doc}
                                setRWdelete={setRWdelete}
                                id={doc.id}
                                updateDocumentField={updateDocumentField}
                              />
                            )}
                          </>
                        )}
                        <h5 className="card-title text-capitalize">
                          {work.title}
                        </h5>
                        <p className="card-text">{work.description}</p>
                        <div className="row ">
                          <a
                            target="_blank"
                            href={work.link}
                            className="btn btn-primary col-11 col-md-4"
                          >
                            Go to project
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
