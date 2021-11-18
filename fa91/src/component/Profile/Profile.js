import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import ProfileAvatar from "./ProfileAvatar";
import { useState, useEffect } from "react";
import { useFirestore } from "../hook/useFirestore";
import { useParams } from "react-router";
import ProfileProject from "./ProfileProject";
import { useDocument } from "../hook/useDoucment";

import UserProfile from "./UserProfile";

export default function Profile() {
  const { id } = useParams();
  const [career, setCareer] = useState("");
  const { updateDocumentField, response } = useFirestore("users");
  const { user } = useAuthContext();
  // const { documents, error } = useCollection("users");
  // const doc = documents
  //   ? documents.filter((doc) => doc.id === id)[0]
  //   : null;

  const { doc, isPending, error } = useDocument("users", id);

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

  const toggoleFollow = async () => {
    const followerToAdd = {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    const followingToAdd = {
      id: id,
      displayName: doc.displayName,
      photoURL: doc.photoURL,
    };
    if (
      doc.followers.filter((followers) => followers.id === user.uid).length ===
      0
    ) {
      await updateDocumentField(doc.id, {
        followers: doc.followers
          ? [...doc.followers, followerToAdd]
          : [followerToAdd],
      });
      await updateDocumentField(user.uid, {
        following: doc.following
          ? [...doc.following, followingToAdd]
          : [followingToAdd],
      });
    } else {
      await updateDocumentField(doc.id, {
        followers: doc.followers.filter(
          (followers) => followers.id !== user.uid
        ),
      });
      await updateDocumentField(user.uid, {
        following: doc.following.filter((following) => following.id !== id),
      });
    }
  };

  // fetching the user data projects from the database

  console.log(doc);

  return (
    <div className="container py-5">
      <div className="row ">
        <div className="col-lg-4 mt-5 mb-2">
          <div className="profile-card-4 z-depth-3">
            <div className="card">
              <div className="card-body text-center bg-primary rounded-top">
                <div className="user-box"></div>
                <ProfileAvatar src={doc.photoURL} online={doc.online} />
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
                <div className="row mb-4">
                  <div className="col-6">
                    {doc.followers.filter(
                      (followers) => followers.id === user.uid
                    ).length === 0 ? (
                      <button
                        className="btn btn-primary btn-block text-capitalize"
                        onClick={toggoleFollow}
                        disabled={user.uid === doc.id}
                      >
                        Follow <i className="fas fa-user-plus"></i>
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger btn-block text-capitalize  "
                        onClick={toggoleFollow}
                      >
                        Unfollow <i className="fas fa-user-minus"></i>
                      </button>
                    )}
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary btn-block">
                      <i className="fas fa-comment-alt"></i> Message
                    </button>
                  </div>
                </div>
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
                    <h4 className="mb-1 line-height-5">
                      {doc.followers.length}
                    </h4>
                    <small className="mb-0 font-weight-bold">Followers</small>
                  </div>
                  <div className="col p-2">
                    <h4 className="mb-1 line-height-5">
                      {doc.following.length}
                    </h4>
                    <small className="mb-0 font-weight-bold">Following</small>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <div className="row">
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
                <div className="tab-pane active show " id="profile">
                  <UserProfile doc={doc} />
                </div>

                <div className="tab-pane " id="messages">
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

                <div className="tab-pane " id="edit">
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
