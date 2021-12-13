import { useAuthContext } from "../hook/useAuthContext";
import { useThemeContext } from "../hook/useThemeContext";
import ProfileAvatar from "./ProfileAvatar";
import { useState } from "react";
import { useFirestore } from "../hook/useFirestore";
import { useParams } from "react-router";
import ProfileProject from "./ProfileProject";
import { useDocument } from "../hook/useDoucment";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import UserProfile from "./UserProfile";
import EditeProfile from "./EditeProfile";
import PresenceState from "../Follow/PresenceState";
import { projectFirestore, projectStorage } from "../../firebase/firebase";

export default function Profile() {
  const { isLightTheme } = useThemeContext();
  const { id } = useParams();
  const [career, setCareer] = useState("");
  const [education, setEducation] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [country, setCountry] = useState("");
  const [show, setShow] = useState(true);
  const { updateDocumentField, response } = useFirestore("users");
  const { user } = useAuthContext();

  const { doc, isPending, error } = useDocument("users", id);
  const { doc: userDoc } = useDocument("users", user.uid);
  console.log(userDoc);

  const userFollower = userDoc && userDoc.following;
  console.log(userFollower);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!doc) {
    return (
      <div className="spinner-border text-primary" role="status">
        {" "}
        <span className="sr-only">profile Loading...</span>{" "}
      </div>
    );
  }

  const fa = doc.followers.find((follower) => follower.id === user.uid);
  console.log(fa);

  const toggoleFollow = async () => {
    const followerToAdd = {
      id: user.uid,
    };
    const followingToAdd = {
      id: id,
    };

    if (
      !doc.followers ||
      !doc.followers.find((follower) => follower.id === user.uid)
    ) {
      await updateDocumentField(doc.id, {
        followers: doc.followers
          ? [...doc.followers, followerToAdd]
          : [followerToAdd],
      });
      await updateDocumentField(user.uid, {
        following: userDoc.following
          ? [...userDoc.following, followingToAdd]
          : [followingToAdd],
      });
    } else {
      await updateDocumentField(doc.id, {
        followers: doc.followers.filter(
          (followers) => followers.id !== user.uid
        ),
      });
      await updateDocumentField(user.uid, {
        following: userDoc.following.filter((following) => following.id !== id),
      });
    }
  };

  // Edit Profile function after save changes set show to false
  const saveChanges = (Boolean) => {
    setShow(Boolean);
  };

  return (
    <div className="container py-2">
      <div className="row ">
        <div className="col-lg-4 mt-5 mb-2">
          <div className="profile-card-4 z-depth-3">
            <div className="card shadow">
              <div className="card-body text-center bg-primary rounded-top">
                <div className="user-box"></div>
                <ProfileAvatar src={doc.photoURL} uid={doc.id} user={user} />
                <h5 className="mb-1 text-white text-capitalize">
                  {doc.fullName}
                </h5>
                <h6 className="mb-1 text-white ">@{doc.displayName}</h6>
                {!doc.about && user.uid !== doc.id && (
                  <p className="text-white">no career added yet</p>
                )}
                {doc.career && (
                  <h6 className="text-light text-capitalize">
                    <i className="fas fa-briefcase "> </i> {doc.career}
                  </h6>
                )}
                {!doc.career && user.uid === doc.id && (
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
                {user.uid == doc.id ? null : (
                  <div className="row mb-4">
                    <div className="col-6">
                      {doc.followers
                        .map((follower) => follower.id)
                        .filter((follow) => follow == user.uid).length === 0 ? (
                        <button
                          className="btn btn-primary btn-block text-capitalize"
                          onClick={toggoleFollow}
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
                )}
                <ul className="list-group shadow-none">
                  <li className="list-group-item">
                    <div className="list-details">
                      <i className="fab fa-whatsapp fa-lg text-success"></i>
                      {!doc.whatsApp && user.uid !== doc.id && (
                        <span className="text-muted small">
                          no whatsapp added yet
                        </span>
                      )}
                      {doc.whatsApp && (
                        <span className="text-success"> {doc.whatsApp}</span>
                      )}
                      {!doc.whatsApp && user.uid === doc.id && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            updateDocumentField(doc.id, {
                              whatsApp: whatsApp,
                            });
                          }}
                        >
                          <div className="form-group">
                            <input
                              type="phone"
                              className="form-control"
                              name="whatsapp"
                              placeholder="Enter your whatsapp number"
                              value={whatsApp}
                              onChange={(e) => setWhatsApp(e.target.value)}
                            />
                            <button className="btn btn-primary ">Update</button>
                          </div>
                        </form>
                      )}
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="list-details">
                      <i className="fas fa-envelope fa-lg text-primary"></i>
                      <span> {doc.email}</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="list-details">
                      <i className="fas fa-map-marker-alt fa-lg text-danger"></i>
                      {!doc.country && user.uid !== doc.id && (
                        <span className="text-muted small">
                          no country added yet
                        </span>
                      )}
                      {doc.country && (
                        <span className="text-danger text-capitalize">
                          {" "}
                          {doc.country}
                        </span>
                      )}
                      {!doc.country && user.uid === doc.id && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            updateDocumentField(doc.id, {
                              country: country,
                            });
                          }}
                        >
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="country"
                              placeholder="Enter your country"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            />
                            <button className="btn btn-primary ">Update</button>
                          </div>
                        </form>
                      )}
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
          <div
            className={`${
              isLightTheme ? "bg-light text-dark" : "bg-dark text-light shadow"
            } card bg-opacity-50 bg-gradient z-depth-3`}
          >
            <div className="card-body">
              <div className="row justify-content-around mb-1 ">
                <div className="col-sm-6 col-12 mb-2 ">
                  <button
                    className="btn btn-primary btn-block "
                    onClick={() => setShow(true)}
                  >
                    profile <i className="fas fa-user-circle"></i>
                  </button>
                </div>
                {user.uid === doc.id && (
                  <div className="col-sm-6 col-12">
                    <button
                      className="btn btn-primary  btn-block "
                      onClick={() => setShow(false)}
                    >
                      edit profile <i className="fas fa-user-edit"></i>
                    </button>
                  </div>
                )}
                <div className="col-12">
                  {show && <UserProfile doc={doc} />}
                  {!show && user.uid === doc.id && (
                    <EditeProfile
                      doc={doc}
                      updateDocumentField={updateDocumentField}
                      saveChanges={saveChanges}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
