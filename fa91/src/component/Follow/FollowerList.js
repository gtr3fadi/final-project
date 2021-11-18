import Avatar from "../Avatar";
import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useState } from "react";

export default function FollowerList() {
  const [show, setShow] = useState(false);
  const { user } = useAuthContext();
  const { documents, error } = useCollection("users");
  if (!documents) return <p className="spinner">Loading...</p>;

  return (
    <div
      className="follower-list"
      style={{
        position: "fixed",
        top: "60px",
        right: "0px",
        width: "170px",
        maxHeight: "calc(100vh - 60px)",
      }}
      onClick={() => setShow(!show)}
    >
      <div
        className="follower-list-header"
        style={{
          height: "50px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          cursor: "pointer",
          borderTopLeftRadius: "13px",
          borderBottomLeftRadius: "13px",
          border: "1px solid #1266f1",
        }}
      >
        <div
          className="follower-list-header-title"
          style={{
            fontSize: "20px",

            padding: "10px",
          }}
        >
          Followers <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      {show && (
        <div
          className="follower-list-body"
          style={{
            height: "calc(100vh - 130px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
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
  );
}
