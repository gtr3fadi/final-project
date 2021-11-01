import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "./hook/useFetch";

export default function SingleProject() {
  const { id } = useParams();
  const url = "https://jsonplaceholder.typicode.com/users/" + id;
  const { data, isPending, error } = useFetch(url);
  const history = useHistory();

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
        <div className="card">
          <h3>Name:{data.name}</h3>
          <p> Email :{data.email}</p>
          <p> Phone :{data.phone}</p>
          <p> Website :{data.website}</p>
          <button className="btn btn-primary">Add to your Project</button>
        </div>
      )}
    </div>
  );
}
