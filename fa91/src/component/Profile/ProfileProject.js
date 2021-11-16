import { useCollection } from "../hook/useCollection"





export default function ProfileProject({ id }) {
    
    const { documents: data, error } = useCollection("projects", ["createdAt", "desc"]);

    const filteredData = data ? data.filter((item) => item.uid === id) : [];

    return (
      
        <h4 className="mb-1 line-height-5">
          {error && <p>Error: {error.message}</p>}
          {data && filteredData.length}
        </h4>
      
    );
}
