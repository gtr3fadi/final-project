import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDocument } from "./hook/useDoucment";
import ProjectComment from "./ProjectComment";
import ProjectSummary from "./ProjectSummary";
import UpdateModal from "./UpdateModal";
import { useAuthContext } from "./hook/useAuthContext";
import DeleteModal from "./DeleteModal";

export default function SingleProject() {
  const { id } = useParams();
  const { user } = useAuthContext();

  const { doc, isPending, error } = useDocument("projects", id);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/project");
      }, 2000);
    }
  }, [error]);

  if (!doc) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container  mt-5 py-5">
      <div className="row">
        <div className="col-12 mt-3 ps-4">
          {doc.createdBy.uid === user.uid && (
            <button
              className="btn btn-primary btn-sm col-md-3 col-5 ms-2"
              onClick={() => setUpdateModal(true)}
            >
              update
            </button>
          )}
          {updateModal && (
            <UpdateModal data={doc} setUpdateModal={setUpdateModal} />
          )}
          {user.uid === doc.createdBy.uid && (
            <div
              className="btn btn-danger btn-sm col-md-3 col-5 ms-2"
              onClick={() => setDeleteModal(true)}
            >
              Delete
            </div>
          )}
          {deleteModal && (
            <DeleteModal id={doc.id} setDeleteModal={setDeleteModal} />
          )}
        </div>
        <div className="col-lg-8 col-md-12">
          <ProjectSummary project={doc} />
        </div>
        <div className="col-lg-4 col-md-12">
          <ProjectComment project={doc} />
        </div>
      </div>
    </div>
  );
}
