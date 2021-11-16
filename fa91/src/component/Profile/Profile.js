import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import ProfileAvatar from "./ProfileAvatar";
import { useState, useEffect } from "react";
import { useFirestore } from "../hook/useFirestore";
import { useParams } from "react-router";
import ProfileProject from "./ProfileProject";
import Select from "react-select";
import { webDevList } from "./Skills";

export default function Profile() {
  const { id } = useParams();

  const { updateDocumentField, response } = useFirestore("users");
  const { user } = useAuthContext();
  const { documents, error } = useCollection("users");
  const doc = documents
    ? documents.filter((doc) => doc.id === user.uid)[0]
    : null;

  const [career, setCareer] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [selectValue, setSelectValue] = useState([]);
  console.log(selectValue);

  const sk = selectValue.map((item) => {
    return item.value;
  });

  console.log(sk);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!doc) {
    return (
      <div className="spinner-border text-primary" role="status">
        {" "}
        <span className="sr-only">Loading...</span>{" "}
      </div>
    );
  }

  // fetching the user data projects from the database

  console.log(doc);

  return (
    <div className="container py-5">
      <div className="row ">
        <div className="col-lg-4 mt-5 mb-2">
          <div className="profile-card-4 z-depth-3">
            <div className="card">
              <div className="card-body text-center bg-primary rounded-top">
                <div className="user-box">
                  <ProfileAvatar src={doc.photoURL} />;
                </div>
                <h5 className="mb-1 text-white text-capitalize">
                  {doc.fullName}
                </h5>
                <h6 className="mb-1 text-white ">@{doc.displayName}</h6>
                {doc.career && (
                  <h6 className="text-light text-capitalize">
                    <i className="fas fa-briefcase "> </i> {doc.career}
                  </h6>
                )}

                {!doc.career && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateDocumentField(doc.id, {
                        career: career,
                      });
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="career"
                        placeholder="Enter your career"
                        value={career}
                        onChange={(e) => setCareer(e.target.value)}
                      />

                      <button className="btn btn-primary ">Update</button>
                    </div>
                  </form>
                )}
              </div>
              <div className="card-body">
                <ul className="list-group shadow-none">
                  <li className="list-group-item">
                    <div className="list-details">
                      <i className="fab fa-whatsapp fa-lg text-success"></i>
                      <span>9910XXXXXX</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="list-details">
                      <i className="fas fa-envelope fa-lg text-primary"></i>
                      <span>{doc.email}</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="list-details">
                      <i className="fas fa-map-marker-alt fa-lg text-danger"></i>
                    </div>
                  </li>
                </ul>
                <div className="row text-center mt-4">
                  <div className="col p-2">
                    <ProfileProject id={doc.id} />
                    <small className="mb-0 font-weight-bold">Projects</small>
                  </div>
                  <div className="col p-2">
                    <h4 className="mb-1 line-height-5">2.2k</h4>
                    <small className="mb-0 font-weight-bold">Followers</small>
                  </div>
                  <div className="col p-2">
                    <h4 className="mb-1 line-height-5">9.1k</h4>
                    <small className="mb-0 font-weight-bold">Views</small>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <div className="row">
                  <div className="col-6">
                    <button className="btn btn-primary btn-block">
                      <i className="fas fa-user-friends"></i> Follow
                    </button>
                    <small className="text-muted">
                      <i className="fas fa-user-friends"></i> Follow
                    </small>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary btn-block">
                      <i className="fas fa-comment-alt"></i> Message
                    </button>
                    <small className="text-muted">
                      <i className="fas fa-comment-alt"></i> Message
                    </small>
                  </div>
                  <div className="col-12">
                    <i className="fas fa-portrait me-1"></i>
                    member since{" "}
                    <span className="text-muted">
                      {new Date(doc.createdAt.toDate()).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 mt-5 mb-2">
          <div className="card z-depth-3">
            <div className="card-body">
              <ul className="nav nav-pills nav-pills-primary nav-justified">
                <li className="nav-item">
                  <a
                    href="javascript:void();"
                    data-target="#profile"
                    data-toggle="pill"
                    className="nav-link active show"
                  >
                    <i className="icon-user"></i>{" "}
                    <span className="hidden-xs">Profile</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="javascript:void();"
                    data-target="#messages"
                    data-toggle="pill"
                    className="nav-link"
                  >
                    <i className="icon-envelope-open"></i>{" "}
                    <span className="hidden-xs">Messages</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="javascript:void();"
                    data-target="#edit"
                    data-toggle="pill"
                    className="nav-link"
                  >
                    <i className="icon-note"></i>{" "}
                    <span className="hidden-xs">Edit</span>
                  </a>
                </li>
              </ul>
              <div className="tab-content p-3">
                <div className="tab-pane active show" id="profile">
                  <h5 className="mb-3">User Profile</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="font-weight-bold">About Me</h6>
                      {doc.about && (
                        <p className=" text-capitalize ">{doc.about}</p>
                      )}
                      {!doc.about && (
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
                            <button className="btn btn-danger btn-sm">
                              {skill}
                            </button>
                          </span>
                        ))}

                      {!doc.skills && (
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
                      <h6>Recent badges</h6>
                      <a
                        href="javascript:void();"
                        className="badge badge-dark badge-pill"
                      >
                        html5
                      </a>
                      <a
                        href="javascript:void();"
                        className="badge badge-dark badge-pill"
                      >
                        react
                      </a>
                      <a
                        href="javascript:void();"
                        className="badge badge-dark badge-pill"
                      >
                        codeply
                      </a>
                      <a
                        href="javascript:void();"
                        className="badge badge-dark badge-pill"
                      >
                        angularjs
                      </a>
                      <a
                        href="javascript:void();"
                        className="badge badge-dark badge-pill"
                      >
                        css3
                      </a>
                      <a
                        href="javascript:void();"
                        className="badge badge-dark badge-pill"
                      >
                        jquery
                      </a>
                      <a
                        href="javascript:void();"
                        className="badge badge-dark badge-pill"
                      >
                        bootstrap
                      </a>
                      <a
                        href="javascript:void();"
                        className="badge badge-dark badge-pill"
                      >
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
                        <span className="fa fa-clock-o ion-clock float-right"></span>{" "}
                        Recent Activity
                      </h5>
                      <table className="table table-hover table-striped">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Abby</strong> joined ACME Project Team in{" "}
                              <strong>`Collaboration`</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Gary</strong> deleted My Board1 in{" "}
                              <strong>`Discussions`</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Kensington</strong> deleted MyBoard3 in{" "}
                              <strong>`Discussions`</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>John</strong> deleted My Board1 in{" "}
                              <strong>`Discussions`</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Skell</strong> deleted his post Look at
                              Why this is.. in <strong>`Discussions`</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="messages">
                  <div
                    className="alert alert-info alert-dismissible"
                    role="alert"
                  >
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    >
                      ×
                    </button>
                    <div className="alert-icon">
                      <i className="icon-info"></i>
                    </div>
                    <div className="alert-message">
                      <span>
                        <strong>Info!</strong> Lorem Ipsum is simply dummy text.
                      </span>
                    </div>
                  </div>
                  <table className="table table-hover table-striped">
                    <tbody>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            3 hrs ago
                          </span>{" "}
                          Here is your a link to the latest summary report from
                          the..
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            Yesterday
                          </span>{" "}
                          There has been a request on your account since that
                          was..
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            9/10
                          </span>{" "}
                          Porttitor vitae ultrices quis, dapibus id dolor. Morbi
                          venenatis lacinia rhoncus.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            9/4
                          </span>{" "}
                          Vestibulum tincidunt ullamcorper eros eget luctus.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            9/4
                          </span>{" "}
                          Maxamillion ais the fix for tibulum tincidunt
                          ullamcorper eros.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane" id="edit">
                  <form>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        First name
                      </label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="text"
                          value="Mark"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        Last name
                      </label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="text"
                          value="Jhonsan"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        Email
                      </label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="email"
                          value="mark@example.com"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        Change profile
                      </label>
                      <div className="col-lg-9">
                        <input className="form-control" type="file" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        Website
                      </label>
                      <div className="col-lg-9">
                        <input className="form-control" type="url" value="" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        Address
                      </label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="text"
                          value=""
                          placeholder="Street"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"></label>
                      <div className="col-lg-6">
                        <input
                          className="form-control"
                          type="text"
                          value=""
                          placeholder="City"
                        />
                      </div>
                      <div className="col-lg-3">
                        <input
                          className="form-control"
                          type="text"
                          value=""
                          placeholder="State"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        Username
                      </label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="text"
                          value="jhonsanmark"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        Password
                      </label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="password"
                          value="11111122333"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">
                        Confirm password
                      </label>
                      <div className="col-lg-9">
                        <input
                          className="form-control"
                          type="password"
                          value="11111122333"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label"></label>
                      <div className="col-lg-9">
                        <input
                          type="reset"
                          className="btn btn-secondary"
                          value="Cancel"
                        />
                        <input
                          type="button"
                          className="btn btn-primary"
                          value="Save Changes"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
