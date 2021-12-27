import { useCollection } from "../hook/useCollection";
import FindFreelancerCard from "./FindFreelancerCard";

export default function FindFreelancer() {
  const { documents, error } = useCollection("users");
  if (error) {
    return <div>Error</div>;
  }
  if (!documents) {
    return <div>Loading</div>;
  }

  const data =
    documents &&
    documents
      .map((doc) => doc)
      .filter(
        (doc) => doc.career && doc.career && doc.skills && doc.skills.length > 0
      );

  console.log(data);

  return (
    // card for freelancer
    <div className="container  py-4 mt-5">
      <div className="row row-cols-md-2 row-cols-1 row-cols-lg-3   justify-content-around ">
        {data &&
          data.map((user) => {
            return <FindFreelancerCard user={user} key={user.uid} />;
          })}
      </div>
    </div>
  );
}
