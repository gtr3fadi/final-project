import Avatar from "../Avatar";
import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useState } from "react";
import sty from "./Follower.module.css";
import { Link } from "react-router-dom";
import{motion} from "framer-motion"








export default function FollowerList() {
  const [show, setShow] = useState(false);
  const { user } = useAuthContext();
  const { documents, error } = useCollection("users");
  if (!documents) return <p className="spinner">Loading...</p>;

  const userDoc = documents && user ? documents.find(doc => doc.id === user.uid) : null;
  const followers = userDoc ? userDoc.followers : null;

  const handelOnline = (id) => {
    const userDoc = documents && user ? documents.find(doc => doc.id === id) : null;
    console.log(userDoc);
    const online = userDoc ? userDoc.online : null;
    console.log(online);
    if (online)
      return <span className={sty.online}></span>;
    
  }

  return (
    <>
      {user && followers && (
        <div className={sty.followerlist} onClick={() => setShow(!show)}>
          <div className={sty.followerlistHeader}>
            <div className={sty.followerlistHeaderTitle}>
              <i className="fas fa-user-friends me-1"></i>
              Followers 
            </div>
          </div>
          {show && (
            <motion.div animate={{x:0}} initial={{x:100}} transition={{duration:1}}
              className={sty.followerlistBody}>
              {followers.map((doc) => (
                <div
                  className="follower-list-item"
                  key={doc.id}
                  style={{
                    padding: "10px",
                  }}
                >
                  <p className="d-flex justify-content-around align-items-center">
                    <Link
                      to={`/profile/${doc.id}`}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {documents && documents.find(doc => doc.id === doc.id).online && <span className={sty.online}></span>}
                      <span className="text-capitalize ms-1 font-weight-bold">
                        {doc.displayName}
                      </span>
                      <Avatar src={doc.photoURL} />
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
