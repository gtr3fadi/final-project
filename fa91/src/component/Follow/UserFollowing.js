import FindFreelancerCard from "../FindFreelancer/FindFreelancerCard";
import { useParams } from "react-router-dom";
import { useDocument } from "../hook/useDoucment";

const UserFollowing = () => {
  const { id } = useParams();
  const { doc, error, isPending } = useDocument("users", id);
  const following = doc ? doc.following : [];

  console.log(following);

  return <div>
  </div>;
};

export default UserFollowing;
