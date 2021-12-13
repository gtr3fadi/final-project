import AvatarEditor from "react-avatar-editor";
import { useRef, useState } from "react";
import { projectStorage, projectFirestore,firebase } from "../firebase/firebase";
import { useAuthContext } from "./hook/useAuthContext";

export default function AvatarUploadModal({ img, setShowModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const avaterEditorRef = useRef();
  const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("file processing error"));
        }
      });
    });
  };

  const onUploadHandler = async () => {
    setIsLoading(true);
    const canvas = avaterEditorRef.current.getImageScaledToCanvas();
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = projectStorage
        .ref(`avatars/${user.uid}`)
        .child("avatar");
      const avatarUploadResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      const avatarUrl = await avatarUploadResult.ref.getDownloadURL();

      await user.updateProfile({ photoURL: avatarUrl });
      await projectFirestore.collection("users").doc(user.uid).update({
        photoURL: avatarUrl,
      });
      
      await projectFirestore.collection("projects").where("createdBy.uid", "==", user.uid).get()
        .then(async (snapshot) => {
          snapshot.forEach(async (doc) => {
            await doc.ref.update({
              createdBy: {
                ...doc.data().createdBy,
                photoURL: avatarUrl,
              },
            });
          });
        });

      await firebase.database().ref(`/images/${user.uid}`).set({
        avatar: avatarUrl,
      });

      window.location.reload();

      setIsLoading(false);
      setShowModal(false);
     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "80%",
          backgroundColor: "rgba(0, 0, 0, .9)",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {img && (
          <AvatarEditor
            ref={avaterEditorRef}
            image={img}
            width={200}
            height={200}
            border={10}
            borderRadius={100}
            rotate={0}
          />
        )}
        <div>
          <button
            className="btn btn-primary mx-1"
            onClick={() => {
              onUploadHandler();
            }}
            disabled={isLoading}
          >
            {" "}
            Upload a new image{" "}
          </button>
          <button
            className="btn btn-secondary mx-1"
            onClick={() => setShowModal(false)}
            disabled={isLoading}
          >
            {" "}
            Close{" "}
          </button>
        </div>
        {isLoading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
      </div>
    </div>
  );
}
