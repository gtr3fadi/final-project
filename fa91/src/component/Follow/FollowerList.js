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
  const following = userDoc ? userDoc.following : null;

  

  const follow = followers && following ? [...followers, ...following] : null;
  const follower = follow ? follow.map(doc => doc.id): null;
  // remove duplicates
  const unique = follower ? [...new Set(follower)] : null;
  const uniqueDoc = unique && documents ? documents.filter(doc => unique.includes(doc.id)) : null;
  const followerList = uniqueDoc ? uniqueDoc.filter(doc => doc.id !== user.uid) : null;

console.log(follow)
console.log(follower)
  console.log(unique)
  console.log(uniqueDoc)
  
  console.log(followerList)


  
  
 
  

  

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
      {user && followerList && (
        <div className={sty.followerlist} onClick={() => setShow(!show)}>
          <div className={sty.followerlistHeader}>
            <div className={sty.followerlistHeaderTitle}>
              <i className="fas fa-user-friends me-1"></i>
              Followers
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
                    padding: "10px",
                  }}
                >
                  <p className="d-flex justify-content-end align-items-center">
                    <Link
                      to={`/profile/${doc.uid}`}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {doc.online ? <span className={sty.online}></span> : null}
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
