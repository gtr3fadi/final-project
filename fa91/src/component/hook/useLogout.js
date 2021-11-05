import { useState } from "react";
import { projectAuth } from "../../firebase/firebase";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
