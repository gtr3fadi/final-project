import React, { useState } from "react";
import { useFetch } from "../hook/useFetch";
import { Link } from "react-router-dom";

export default function Project() {
    const [project, setProject] = useState([]);
    const { data, isPending, error } = useFetch(
      "https://jsonplaceholder.typicode.com/comments?postId=1"
    );


    return (
        console.log(data),
        <div>
            <h1>Project</h1>
            {isPending && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <ul>
                    {data.map(item => (
                        <li key={item.id} className="m-5">Name : {item.name}
                            <p className="comment-info">id: {item.id}</p>
                            <p className="comment-info">Email : {item.email}</p>
                            <div className="comment-text">Body : {item.body}</div>
                            <button className="btn btn-secondary" style={{
                                color: "white",
                                fontSize: "1.2rem",
                            }}>
                                <Link to={`/project/${item.id}`}>Project Deatails</Link>
                            </button>
                        </li>
                        

                    ))}
                </ul>
            )}
            
            
        </div>
    )
}
