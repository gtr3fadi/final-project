import { useState, useEffect } from "react";
import {
  projectAuth,
  projectFirestore,
  projectStorage,
} from "../../firebase/firebase";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName, thumbnail, fullName) => {
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

      // upload image to firebase storage
      const uploadPath = `thumbnails/${res.user.uid}`;
      const image = await projectStorage
        .ref(uploadPath)
        .child(`avatar`)
        .put(thumbnail);
      const imgUrl = await image.ref.getDownloadURL();

      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // creat user document in firestore
      await projectFirestore.collection("users").doc(res.user.uid).set({
        displayName,
        online: true,
        photoURL: imgUrl,
        uid: res.user.uid,
        fullName,
        email,
        createdAt: new Date(),
        following: [],
        followers: [],
      });

      dispatch({
        type: "LOGIN",
        payload: res.user,
      });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
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
