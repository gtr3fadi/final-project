import Select from "react-select";
import { webDevList } from "./Skills";
import { useState } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useFirestore } from "../hook/useFirestore";
import { v4 as uuidv4 } from "uuid";
import { useThemeContext } from "../hook/useThemeContext";

export default function UserProfile({ doc }) {
  const { isLightTheme } = useThemeContext();

  const { user } = useAuthContext();
  const { updateDocumentField, response } = useFirestore("users");

  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [selectValue, setSelectValue] = useState([]);
  console.log(selectValue);

  const sk = selectValue.map((item) => {
    return item.value;
  });

  console.log(sk);

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
        <div className="col-md-6">
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
          {!doc.skills || doc.skills.length === 0 && user.uid === doc.id && (  
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
        <div className="col-md-6">
          <h6>Recent </h6>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            html5
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            react
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            codeply
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            angularjs
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            css3
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            jquery
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            bootstrap
          </a>
          <a href="javascript:void();" className="badge badge-dark badge-pill">
            responsive-design
          </a>
          <hr />
          <span className="badge badge-primary">
            <i className="fa fa-user"></i> 900 Followers
          </span>
          <span className="badge badge-success">
            <i className="fa fa-cog"></i> 43 Forks
          </span>
          <span className="badge badge-danger">
            <i className="fa fa-eye"></i> 245 Views
          </span>
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
                <label>
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
                <label>
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
                <label>
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

          <table className="table table-hover table-striped ">
            <tbody>
              {!doc.recentWork && (
                <tr>
                  <td className={isLightTheme ? "text-muted" : "text-light"}>
                    No Recent Work Added Yet
                  </td>
                </tr>
              )}
              {doc.recentWork &&
                doc.recentWork.map((work) => (
                  <tr>
                    <td>
                      {doc.id === user.uid && (
                        <i
                          onClick={() => {
                            updateDocumentField(doc.id, {
                              recentWork: doc.recentWork.filter(
                                (w) => w.id !== work.id
                              ),
                            });
                          }}
                          className="fa fa-times float-end text-danger "
                        ></i>
                      )}
                      <strong
                        className={isLightTheme ? "text-dark" : "text-white"}
                      >
                        {work.title}
                      </strong>{" "}
                      <br />
                      <p className="text-muted">{work.description}</p>
                      <a href={work.link.substring(0, 20)} target="_blank">
                        {work.link}
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
