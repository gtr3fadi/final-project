import { useEffect ,useState} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { projectFirestore } from "../firebase/firebase";



export default function SingleProject() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const[error, setError] = useState(false);
 
  const history = useHistory();

  useEffect(() => {
    setIsPending(true);
     const unsub= projectFirestore.collection("Projects").doc(id).onSnapshot((doc => {
      if (doc.exists) {
        setData(doc.data());
        setIsPending(false);
      } else {
        setError("could not Find That Project");
        setIsPending(false);
      }
    }
     ));
    return () => {
      unsub();
    };
    
  }, [id]);
  


  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/project");
      }, 2000);
    }
  }, [error]);

  const handelClick = (id) => {
    projectFirestore.collection("Projects").doc(id).delete();
    history.push("/project");
    prompt("Are you sure you want to delete this project?");
    alert("Project Deleted");
  };

  return (
    <div>
      <h1>Single Project</h1>
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>{data.projectName}</h2>
          <p>{data.projectDescription}</p>
          <p className="text-muted">{data.projectDescription}</p>
          <ul className="text-muted">{data.projectCategory}</ul>

          <button
            className="btn btn-primary"
            onClick={() => history.push("/project")}
          >
            Go Back
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handelClick(id)}
          >
            Delete
          </button>

          <Link to={`/project/edit/${id}`}>
            <button className="btn btn-primary">Update Project</button>
          </Link>
        </div>
      )}
    </div>
  );
}
