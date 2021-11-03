import { useEffect ,useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import { projectFirestore } from "../firebase/firebase";



export default function SingleProject() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const[error, setError] = useState(false);
 
  const history = useHistory();

  useEffect(() => {
    setIsPending(true);
    projectFirestore.collection("Projects").doc(id).get().then(doc => {
      if (doc.exists) {
        setData(doc.data());
        setIsPending(false);
      } else {
        setError("could not Find That Project");
        setIsPending(false);
      }
    }
    );
  }, [id]);
  


  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/project");
      }, 2000);
    }
  }, [error]);

  return (
    <div>
      <h1>Single Project</h1>
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>{data.ProjectName}</h2>
          <p>{data.ProjectDescription}</p>
          <p className="text-muted">{data.ProjectDescription}</p>
          <p className="text-muted">{data.ProjectCategory.map(cat => (
            <p>{cat}</p>
          ))}</p>
          
        
          



        </div>

      )}
    </div>
  );
}
