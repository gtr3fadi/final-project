import { useState, useEffect } from "react";
import { projectAuth } from "../../firebase/firebase";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      await res.user.updateProfile({ displayName });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

      dispatch({
        type: "LOGIN",
        payload: res.user,
      });
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signUp };
};