import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/firebase";
import ProjectList from "./ProjectList";

const ProjectForUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = projectFirestore
      .collection("projects")
      .where("uid", "==", id)
      .onSnapshot(
        (snapshot) => {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
          setError(null);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setError("could not fetch the data");
        }
      );
    return () => unsubscribe();
  }, [id]);
    if (error) {
        return <div>{error}</div>;
    }
 

  return (
      <div className="container  py-2 pt-5 mt-5 ">
          <div className="row">
              <div className="col-md-12">
                  <h2 className="text-center text-danger text-capitalize">
                      {data && data[0].createdBy.displayName}'s Projects
                      
                     </h2>
                  <div className="row">
                      <div className="col-md-12">
                          {data && <ProjectList data={data} />}
                          {!data && (
                              <div className="spinerContenar">
                                  <div className="spinner">
                                      <div></div>
                                      <div></div>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
  );
};

export default ProjectForUser;
