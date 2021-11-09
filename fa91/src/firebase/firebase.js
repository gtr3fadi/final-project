import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHf2hDir-ePhb_hutzXdl8P9_l9qBYSx4",
  authDomain: "fa91-react.firebaseapp.com",
  projectId: "fa91-react",
  storageBucket: "fa91-react.appspot.com",
  messagingSenderId: "109451739228",
  appId: "1:109451739228:web:158cbab351366669e66699",
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp =firebase.firestore.Timestamp;

export { projectFirestore, projectAuth , timestamp};
