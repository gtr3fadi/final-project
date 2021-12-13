import { useEffect, useState } from "react";
import { firebase } from "../../firebase/firebase";

export  function useImageURL(uid) {
   
     const [imageURL, setImageURL] = useState(null);

     useEffect(() => {
       const userStatusRef = firebase.database().ref(`/images/${uid}`);
         userStatusRef.on('value', snapshot => {
             if (snapshot.exists()) {
                 const image = snapshot.val();
                    setImageURL(image);
             }
         });
            return () => userStatusRef.off();
     }, [uid]);

     return imageURL;
   }
    

