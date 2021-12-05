import { useEffect, useState } from "react";
import { firebase } from "../../firebase/firebase";

export function useOnlineState(uid) {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const userStatusRef = firebase.database().ref(`/status/${uid}`);
    const onStatusChanged = (snapshot) => {
      setPresence(snapshot.val());
    };
    userStatusRef.on("value", onStatusChanged);
    return () => {
      userStatusRef.off("value", onStatusChanged);
    };
  }, [uid]);

  return presence;
}
