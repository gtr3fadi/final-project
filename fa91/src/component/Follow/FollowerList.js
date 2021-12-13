import Avatar from "../Avatar";
import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useState } from "react";
import sty from "./Follower.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PresenceState from "./PresenceState";

export default function FollowerList() {
  const { user } = useAuthContext();

  const [show, setShow] = useState(false);

  const { documents } = useCollection("users");
  if (!documents) return <p className="spinner">Loading...</p>;

  const userDoc =
    documents && user ? documents.find((doc) => doc.id === user.uid) : null;
  const followers = userDoc ? userDoc.followers : null;
  const following = userDoc ? userDoc.following : null;

  const follow = followers && following ? [...followers, ...following] : null;
  const follower = follow ? follow.map((doc) => doc.id) : null;
  // remove duplicates
  const unique = follower ? [...new Set(follower)] : null;
  const uniqueDoc =
    unique && documents
      ? documents.filter((doc) => unique.includes(doc.id))
      : null;
  const followerList = uniqueDoc
    ? uniqueDoc.filter((doc) => doc.id !== user.uid)
    : null;

  return (
    <>
      {user && followerList && (
        <div className={sty.followerlist} onClick={() => setShow(!show)}>
          <div
            className={sty.followerlistHeader}
            style={{
              width: show ? "150px" : " 50px",
              transition: "all 0.7s",
              borderRadius: show ? "15px" : "50%",
              overflow: "hidden",
            }}
          >
            <div
              className={sty.followerlistHeaderTitle}
              style={{
                transition: "all 0.7s",
              }}
            >
              <i className="fas fa-user-friends ">
                <span className="ps-1">{show ? "Followers" : ""}</span>
              </i>
            </div>
          </div>
          {show && (
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: 100 }}
              transition={{ duration: 1 }}
              className={sty.followerlistBody}
            >
              {followerList.map((doc) => (
                <div
                  className="follower-list-item"
                  key={doc.uid}
                  style={{
                    padding: "5px",
                  }}
                >
                  <p className="  d-flex justify-content-end align-items-center position-relative m-0">
                    <Link
                      to={`/profile/${doc.uid}`}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span className="text-capitalize me-1 font-weight-bold">
                        {doc.displayName.substring(0, 8)}
                      </span>
                      <Avatar uid={doc.uid} />
                      <PresenceState uid={doc.uid} />
                    </Link>
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}
