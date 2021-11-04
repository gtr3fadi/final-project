import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { projectFirestore } from "../firebase/firebase";

export default function UpdateProject() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

     useEffect(() => {
       setIsPending(true);
       projectFirestore
         .collection("Projects")
         .doc(id)
         .get()
         .then((doc) => {
           if (doc.exists) {
             setData(doc.data());
             setIsPending(false);
           } else {
             setError("could not Find That Project");
             setIsPending(false);
           }
         });
     }, [id]);



    return (
        <div>
            <h1>Update Project</h1>
            {isPending ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    projectFirestore
                                        .collection("Projects")
                                        .doc(id)
                                        .update({
                                            projectName: data.projectName,
                                            projectDescription: data.projectDescription,
                                            projectImage: data.projectImage,
                                            projectCategory: data.projectCategory
                                        })
                                        .then(() => {
                                            history.push(`/project/${id}`);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }}
                            >
                                <div>
                                    <label>Project Name</label>
                                    <input
                                        type="text"
                                        name="projectName"
                                        value={data.projectName}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                projectName: e.target.value
                                            });
                                        }}
                                    />

                                    <label>Project Description</label>
                                    <input
                                        type="text"
                                        name="projectDescription"
                                        value={data.projectDescription}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                projectDescription: e.target.value
                                            });
                                        }}
                                    />

                                </div>
                                <button type="submit">Update Project</button>
                
                            </form>

                </div>
            )}

                            

        </div>
    );
}
