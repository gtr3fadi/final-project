import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth ,projectFirestore} from "../../firebase/firebase";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch  } = useAuthContext();

  const login = async (email, password) => {
      setError(null);
    setIsPending(true);
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      dispatch({ type: "LOGIN", payload: res.user });

      // update user status

      const { uid } = res.user;
      await projectFirestore.collection("users").doc(uid).update({
        online: true
      });
     



      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    login,
    isPending,
    error,
  };
};
