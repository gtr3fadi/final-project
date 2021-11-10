import { useEffect, useState } from "react";
import { projectAuth , projectFirestore } from "../../firebase/firebase";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch , user} = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      // update the user's state to offline
      const { uid } = user
      await projectFirestore.collection("users").doc(uid).update({
        online: false
      })
      

      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
