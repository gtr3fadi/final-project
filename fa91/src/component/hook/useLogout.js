import { useEffect, useState } from "react";
import {
  projectAuth,
  projectDatabase,
  projectFirestore,
  firebase,
} from "../../firebase/firebase";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      // update the user's state to offline
      const isOfflineForDatabase = {
        state: "offline",
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };
      const { uid } = user;
      await projectFirestore.collection("users").doc(uid).update({
        online: false,
      });

      await projectDatabase.ref(`status/${uid}`).set(isOfflineForDatabase);

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
