import { createContext, useEffect, useReducer } from "react";
import { projectAuth, firebase} from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "AUTH_READY":
      return {
        ...state,
        user: action.payload,
        AuthIsReady: true,
      };
    default:
      return state;
  }
};
const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    AuthIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_READY", payload: user });
      console.log("user", user);

      const uid = user.uid;
      const userStatusDatabaseRef = firebase.database().ref(`/status/${uid}`);

      firebase
        .database()
        .ref(".info/connected")
        .on("value", function (snapshot) {
          if (snapshot.val() === false) {
            return;
          }
          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(function () {
              userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
      
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
