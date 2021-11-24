import { useState } from "react";
import { useAuthContext } from "./hook/useAuthContext";
import { timestamp } from "../firebase/firebase";
import Avatar from "./Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useFirestore } from "./hook/useFirestore";
import { Link } from "react-router-dom";

export default function ProjectComment({ project }) {
  const { user } = useAuthContext();
  const { response, updateDocumentField } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentToAdd = {
      content: newComment,
      PhotoURL: user.photoURL,
      displayName: user.displayName,
      createdAt: timestamp.fromDate(new Date()),
      userId: user.uid,
      id: user.uid + timestamp.fromDate(new Date()),
    };
    await updateDocumentField(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comment mt-2 ">
      <h4 className="text-center">
        ({project.comments.length})
        <span className="text-primary mx-1">Comments</span>
        <span className="text-primary ">
          <i className="fas fa-comment"></i>
        </span>
      </h4>
      <ul className="list-unstyled">
        {project.comments.map((comment) => (
          <li key={comment.id} className="media mb-1  bg-light p-2  "
            style={{ borderRadius: "10px" }}>
          
            <div className="d-flex justify-content-between align-items-center mx-1 mb-0  ">
              <div className="media-body d-flex justify-content-start align-items-center   ">
                <Avatar src={comment.PhotoURL} />
                <Link to={`/profile/${comment.userId}`}>
                  <h6 className="m-0  mx-1">{comment.displayName}</h6>
                </Link>
                {comment.userId === user.uid ? (
                  <>
                    <small className="text-muted me-1">
                      <i
                        className="fas fa-trash-alt"
                        style={{ color: "red" }}
                        onClick={() => {
                          updateDocumentField(project.id, {
                            comments: project.comments.filter(
                              (com) => com.id !== comment.id
                            ),
                          });
                        }}
                      ></i>
                    </small>
                    <small className="text-muted">
                      <i
                        className="fas fa-edit"
                        style={{ color: "blue" }}
                        onClick={() => {
                          setNewComment(comment.content);
                          updateDocumentField(project.id, {
                            comments: project.comments.filter(
                              (com) => com.id !== comment.id
                            ),
                          });
                        }}
                      ></i>
                    </small>
                  </>
                ) : null}
              </div>
              <div className="media-body d-flex justify-content-start align-items-center   ">
                <small className="text-muted">
                  <i className="fas fa-clock me-1"></i>
                </small>
                <p className="text-muted m-0 small">
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <hr className="mt-1 mb-1" />
            <div className="media-body">
              <p className="text-dark small m-0"
                style={{
                  
                  
                  wordWrap: "break-word",
                 
                  background: "rgba(0,0,0,0.1)",
                  borderRadius: "5px",
                  padding: " 5px 10px ",
                }}
                    
                
              >{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

      {user && (
        <form onSubmit={handleSubmit} className="form-group">
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            className="form-control"
            placeholder="Write a comment..."
          ></textarea>

          <button className="btn btn-primary mt-2">Add Comment</button>
        </form>
      )}
    </div>
  );
}
