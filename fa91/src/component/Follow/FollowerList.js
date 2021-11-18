import Avatar from "../Avatar";
import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useState } from "react";
import sty from "./Follower.module.css";

export default function FollowerList() {
  const [show, setShow] = useState(false);
  const { user } = useAuthContext();
  const { documents, error } = useCollection("users");
  if (!documents) return <p className="spinner">Loading...</p>;

  return (
    <>
      <div className={sty.followerlist} onClick={() => setShow(!show)}>
        <div className={sty.followerlistHeader}>
          <div className={sty.followerlistHeaderTitle}>
            Followers <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        {show && (
          <div 
            className={sty.followerlistBody}
          >
            {documents.map((doc) => (
              <div
                className="follower-list-item"
                key={doc.id}
                style={{
                  padding: "10px",
                }}
              >
                <div className="follower-list-item-avatar">
                  <Avatar src={doc.photoURL} />
                </div>
                <div className="follower-list-item-name">{doc.displayName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
