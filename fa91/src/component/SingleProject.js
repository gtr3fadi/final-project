import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDocument } from "./hook/useDoucment";
import ProjectComment from "./ProjectComment";
import ProjectSummary from "./ProjectSummary";


export default function SingleProject() {
  const { id } = useParams();

  const { doc, isPending, error } = useDocument("projects", id);
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
